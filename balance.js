document.addEventListener("DOMContentLoaded", async () => {
    if (typeof ethers === "undefined") {
        console.error("Ethers.js is not loaded. Please check the script reference.");
        alert("Error: Ethers.js is not loaded. Please refresh the page.");
        return;
    }

    // HTML Elements
    const walletBalanceElement = document.getElementById("balance");
    const walletAddressElement = document.getElementById("wallet-address");
    const refreshButton = document.getElementById("refresh-balance");
    const logoutButton = document.getElementById("logout");

    // Force the API URL to use AeroGames.io, ignoring any global API_URL.
    const AERO_RPC_URL = "https://aeroblockchain.onrender.com/";


    // Retrieve the saved mnemonic or private key
    let savedCredential = localStorage.getItem("savedMnemonic");
    if (!savedCredential) {
        alert("No credential found. Redirecting to wallet creation...");
        window.location.href = "create_wallet.html";
        return;
    }

    savedCredential = savedCredential.trim();
    console.log("Saved Credential:", savedCredential);

    // Generate wallet from the saved credential
    let wallet;
    if (savedCredential.split(" ").length > 1) {
        console.log("Credential detected as a mnemonic phrase.");
        wallet = ethers.Wallet.fromPhrase(savedCredential);
    } else {
        console.log("Credential detected as a private key.");
        if (!savedCredential.startsWith("0x")) {
            savedCredential = "0x" + savedCredential;
        }
        wallet = new ethers.Wallet(savedCredential);
    }

    console.log("Wallet Address:", wallet.address);
    walletAddressElement.textContent = wallet.address;

    // Function to fetch balance via the AERO RPC API
    async function fetchBalance() {
        try {
            const response = await fetch(`${AERO_RPC_URL}/balance/${wallet.address}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            walletBalanceElement.textContent = `${data.balance} AERO`;
            console.log("Fetched Balance:", data.balance);
        } catch (error) {
            console.error(`Error fetching balance for address ${wallet.address} from ${AERO_RPC_URL}:`, error);
            walletBalanceElement.textContent = "Unable to fetch balance AERO";
        }
    }

    // Set placeholder and wait for user to click refresh
    walletBalanceElement.textContent = "Balance not loaded. Click refresh to fetch.";

    // Add refresh button functionality
    refreshButton.addEventListener("click", async () => {
        refreshButton.disabled = true; // Disable button
        walletBalanceElement.textContent = "Refreshing...";
        await fetchBalance();
        refreshButton.disabled = false; // Re-enable button after fetch
    });

    // Logout functionality
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.clear();
            alert("You have been logged out.");
            window.location.href = "index.html";
        });
    }
});
