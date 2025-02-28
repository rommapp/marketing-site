import axios from "axios";

// GitHub repository details
const owner = "rommapp";
const repo = "romm";
const image = "rommapp/romm";

// Fetch the star count from GitHub
async function fetchGitHubStars() {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
    );
    return response.data.stargazers_count.toLocaleString(); // Format with commas
  } catch (error) {
    console.error("Error fetching GitHub stars:", error.message);
    process.exit(1);
  }
}

// Fetch the pull count from Docker Hub
async function fetchDockerPulls() {
  try {
    const response = await axios.get(
      `https://hub.docker.com/v2/repositories/${image}`,
    );
    return response.data.pull_count.toLocaleString(); // Format with commas
  } catch (error) {
    console.error("Error fetching Docker Hub pull count:", error.message);
    process.exit(1);
  }
}

// Main function to run the update
(async function main() {
  const githubStars = await fetchGitHubStars();
  console.log(`GitHub stars: ${githubStars}`);

  const dockerPulls = await fetchDockerPulls();
  console.log(`Docker Hub pulls: ${dockerPulls}`);
})();
