document.addEventListener("DOMContentLoaded", () => {
    const verifyButton = document.getElementById("verify-mnemonic");
    const mnemonicInput = document.getElementById("mnemonic-input");
    const verificationResult = document.getElementById("verification-result");
    const backButton = document.getElementById("back-to-home");

    // Retrieve the saved mnemonic phrase from localStorage
    const savedMnemonic = localStorage.getItem("savedMnemonic");

    if (!savedMnemonic) {
        verificationResult.textContent = "⚠️ No mnemonic phrase found. Please create a wallet first.";
        verificationResult.style.color = "red";
        verifyButton.disabled = true; // Disable verify button
        return;
    }

    verifyButton.addEventListener("click", () => {
        // Normalize input by removing extra spaces and converting to lowercase
        const enteredMnemonic = mnemonicInput.value.trim().replace(/\s+/g, " ").toLowerCase();
        const normalizedSavedMnemonic = savedMnemonic.trim().replace(/\s+/g, " ").toLowerCase();

        if (enteredMnemonic === normalizedSavedMnemonic) {
            verificationResult.textContent = "✅ Mnemonic verified successfully!";
            verificationResult.style.color = "green";
            verifyButton.style.backgroundColor = "#007bff"; // Reset button color
            setTimeout(() => {
                window.location.href = "balance.html"; // Redirect to balance page on success
            }, 1000); // Delay to show success message before redirecting
        } else {
            verificationResult.textContent = "❌ Mnemonic does not match. Please try again.";
            verificationResult.style.color = "red";
            verifyButton.style.backgroundColor = "red"; // Turn button red on failure
        }
    });

    backButton.addEventListener("click", () => {
        window.location.href = "create_wallet.html"; // Redirect back to wallet creation page
    });
});
