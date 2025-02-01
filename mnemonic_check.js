// create_wallet.js

document.addEventListener("DOMContentLoaded", () => {
    let wallet;
    const revealButton = document.getElementById("reveal-mnemonic");
    const continueButton = document.getElementById("continue-to-wallet");
    const mnemonicPhrase = document.getElementById("mnemonic-phrase");

    // Check if ethers.js is loaded
    if (typeof ethers === "undefined") {
        console.error("Ethers.js is not loaded. Make sure it is included.");
        return;
    }

    // Check if a mnemonic exists in localStorage
    const savedMnemonic = localStorage.getItem("savedMnemonic");
    if (savedMnemonic) {
        const words = savedMnemonic.split(" ").map((word, index) => `${index + 1}. ${word}`);
        mnemonicPhrase.textContent = words.join(" \n");
        revealButton.disabled = true; // Disable the Reveal button
        revealButton.textContent = "Revealed"; // Update button text
        continueButton.disabled = false; // Enable the Continue button
    }

    // Reveal button logic
    revealButton.addEventListener("click", () => {
        try {
            if (wallet) return; // Prevent generating another wallet

            wallet = ethers.Wallet.createRandom(); // Create a new wallet
            if (wallet.mnemonic) {
                const words = wallet.mnemonic.phrase.split(" ").map((word, index) => `${index + 1}. ${word}`);
                mnemonicPhrase.textContent = words.join(" \n"); // Display numbered mnemonic
                revealButton.disabled = true; // Disable the Reveal button
                revealButton.textContent = "Revealed"; // Update button text
                continueButton.disabled = false; // Enable the Continue button

                // Save the mnemonic in localStorage for verification and reload
                localStorage.setItem("savedMnemonic", wallet.mnemonic.phrase);
                localStorage.setItem("aeroWalletAddress", wallet.address);
                localStorage.setItem("aeroWalletPrivateKey", wallet.privateKey);
            } else {
                mnemonicPhrase.textContent = "Failed to generate wallet. Try again.";
            }
        } catch (error) {
            console.error("Error generating wallet:", error);
        }
    });

    continueButton.addEventListener("click", () => {
        if (wallet || savedMnemonic) {
            window.location.href = "verify_mnemonic.html"; // Redirect to verify mnemonic page
        }
    });
});
