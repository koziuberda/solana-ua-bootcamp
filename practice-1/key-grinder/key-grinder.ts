import { Keypair } from "@solana/web3.js";

// Function to generate a keypair with a specific prefix
const generateKeypairWithPrefix = async (prefix: string): Promise<Keypair> => {
    let keypair: Keypair;
    let publicKey: string;

    do {
        keypair = Keypair.generate();
        publicKey = keypair.publicKey.toBase58();
    } while (!publicKey.toLowerCase().startsWith(prefix.toLowerCase()));

    return keypair;
};

// Function to run multiple parallel searches
const findKeypairWithPrefix = async (prefix: string, numParallel: number): Promise<Keypair> => {
    const tasks = Array.from({ length: numParallel }, () => generateKeypairWithPrefix(prefix));
    const results = await Promise.all(tasks);

    // Optionally, you might want to refine this logic based on results
    // For simplicity, just return the first result
    return results[0];
};

// Specify the desired prefix and number of parallel searches
const prefix = "anza"; // e.g. "ABC"
const numParallel = 4; // Number of parallel searches

console.log(`Search for ${prefix} prefix is started...`)

// Generate the keypair with the specified prefix
findKeypairWithPrefix(prefix, numParallel).then(keypair => {
    console.log(`Found a keypair with prefix "${prefix}"`);
    console.log(`The public key is: `, keypair.publicKey.toBase58());
    console.log(`The secret key is: `, keypair.secretKey);
    console.log(`✅ Finished!`);
});
