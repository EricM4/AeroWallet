document.addEventListener("DOMContentLoaded", async () => {
    // Check if ethers.js is available
    if (typeof ethers === "undefined") {
        console.error("Ethers.js is not loaded. Please check the script reference.");
        alert("Error: Ethers.js is not loaded. Please refresh the page.");
        return;
    }

    const walletAddressElement = document.getElementById("wallet-address");
    const walletBalanceElement = document.getElementById("wallet-balance");
    const refreshButton = document.getElementById("refresh-balance");
    const logoutButton = document.getElementById("logout");

    // Your local Aero blockchain node's RPC URL
    const AERO_RPC_URL = "http://127.0.0.1:8545"; // Make sure your node is running at this URL

    // Retrieve mnemonic from localStorage (assumed valid after verification in verify_mnemonic.js)
    let savedMnemonic = localStorage.getItem("savedMnemonic");

    if (!savedMnemonic) {
        alert("No mnemonic found. Redirecting to wallet creation...");
        window.location.href = "create_wallet.html";
        return;
    }

    // Debug: Log saved mnemonic
    console.log("Saved Mnemonic:", savedMnemonic);

    // Remove the '0x' prefix if it's included mistakenly (although mnemonic shouldn't have it, we are being cautious)
    if (savedMnemonic.startsWith("0x")) {
        console.log("Removing '0x' prefix from mnemonic.");
        savedMnemonic = savedMnemonic.substring(2); // Remove the '0x' from the mnemonic string
    }

    // Normalize the mnemonic by trimming spaces and ensuring proper format (words only)
    savedMnemonic = savedMnemonic.trim().replace(/\s+/g, " "); // Ensure spaces are normalized
    console.log("Normalized Mnemonic:", savedMnemonic); // Log normalized mnemonic for debugging

    try {
        // Initialize wallet using ethers.js with the correct mnemonic
        const wallet = new ethers.Wallet(savedMnemonic); // Create wallet directly using the constructor
        console.log("Wallet Address:", wallet.address); // Log the wallet address

        walletAddressElement.textContent = wallet.address;

        // Initialize the provider for Aero blockchain
        const provider = new ethers.JsonRpcProvider(AERO_RPC_URL); // Provider for Aero node

        // Fetch balance function
        async function fetchBalance() {
            try {
                const balance = await provider.getBalance(wallet.address);
                walletBalanceElement.textContent = `${ethers.formatEther(balance)} AERO`;
            } catch (error) {
                console.error("Error fetching balance:", error);
                walletBalanceElement.textContent = "Unable to fetch balance";
            }
        }

        // Fetch balance on page load
        await fetchBalance();

        // Refresh balance when the button is clicked
        refreshButton.addEventListener("click", async () => {
            walletBalanceElement.textContent = "Refreshing...";
            await fetchBalance();
        });

        // Logout functionality: Clears data and redirects to the homepage
        logoutButton.addEventListener("click", () => {
            localStorage.clear(); // Clear all stored data
            alert("You have been logged out.");
            window.location.href = "index.html"; // Redirect to the homepage
        });
    } catch (error) {
        console.error("Error initializing wallet:", error);
        alert("An error occurred while initializing your wallet. Please try again.");
    }
});
