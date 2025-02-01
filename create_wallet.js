document.addEventListener("DOMContentLoaded", () => {
    if (typeof ethers === "undefined") {
        console.error("Ethers.js is not available.");
        return;
    }

    const mnemonicBox = document.getElementById("mnemonic-phrase");
    const revealButton = document.getElementById("reveal-mnemonic");
    const continueButton = document.getElementById("continue-to-wallet");
    const backButton = document.getElementById("back-to-home"); // Back button element

    // Check if a mnemonic already exists in localStorage
    let mnemonic = localStorage.getItem("savedMnemonic");

    // Generate a new mnemonic if one doesn't exist
    if (!mnemonic) {
        try {
            mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
            localStorage.setItem("savedMnemonic", mnemonic); // Save to localStorage
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
        mnemonicBox.textContent = numberedMnemonic; // Show the mnemonic
        mnemonicBox.style.display = "block"; // Ensure it's visible
        revealButton.disabled = true; // Disable the reveal button
        continueButton.disabled = false; // Enable the continue button
    });

    // Continue button logic
    continueButton.addEventListener("click", () => {
        window.location.href = "verify_mnemonic.html"; // Redirect to verify page
    });

    // Back button logic: Remove mnemonic from localStorage and redirect to index page
    backButton.addEventListener("click", () => {
        localStorage.removeItem("savedMnemonic"); // Remove mnemonic from localStorage
        window.location.href = "index.html"; // Redirect to the homepage
    });
});
