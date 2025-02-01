document.addEventListener("DOMContentLoaded", () => {
    if (typeof ethers === "undefined") {
        console.error("Ethers.js is not available.");
        return;
    }

    const form = document.getElementById("recover-form");
    const mnemonicInput = document.getElementById("mnemonic-input");
    const recoverButton = document.getElementById("recover-button");
    const errorMessage = document.getElementById("error-message");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const rawMnemonic = mnemonicInput.value.trim();
        const normalizedMnemonic = rawMnemonic.replace(/\s+/g, " "); // Normalize spaces

        try {
            // Use ethers.Wallet.fromPhrase to recover the wallet
            const wallet = ethers.Wallet.fromPhrase(normalizedMnemonic);
            console.log("Recovered Wallet Address:", wallet.address);

            // Save the mnemonic to local storage
            localStorage.setItem("savedMnemonic", normalizedMnemonic);

            // Redirect to balance.html
            window.location.href = "balance.html";
        } catch (error) {
            console.error("Error recovering wallet:", error);
            recoverButton.classList.add("error");
            errorMessage.textContent = "Invalid mnemonic. Please try again.";
        }
    });
});
