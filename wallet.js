// AeroWallet JavaScript - Wallet Logic


document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const createWalletBtn = document.getElementById("create-wallet");
    const recoverWalletBtn = document.getElementById("recover-wallet");
    
    createWalletBtn.addEventListener("click", () => {
        window.location.href = "create_wallet.html"; // Redirect to new wallet creation page
    });

    recoverWalletBtn.addEventListener("click", () => {
        window.location.href = "recover_wallet.html"; // Redirect to wallet recovery page
    });
});