# How to Push Your Code to GitHub

Follow these steps to upload your project to GitHub.

## 1. Prepare Your Project
I have already created a `.gitignore` file for you. This file tells Git which files **NOT** to upload (like your API key and `node_modules`).

## 2. Create a Repository on GitHub.com
1.  Go to [GitHub.com](https://github.com) and log in.
2.  Click the **+** icon in the top right and select **New repository**.
3.  Name your repository (e.g., `ai-schedule-assistant`).
4.  **Do NOT** check "Initialize with README", "Add .gitignore", or "Add license" (we already have these).
5.  Click **Create repository**.

## 3. Configure Git (First Time Only)
If you haven't used Git on this computer before, tell it who you are:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

## 4. Initialize Git Locally
Open your terminal in the project folder and run these commands one by one:

1.  **Initialize Git**:
    ```bash
    git init
    ```

2.  **Add all files**:
    ```bash
    git add .
    ```

3.  **Commit your changes**:
    ```bash
    git commit -m "Initial commit"
    ```

## 4. Connect to GitHub
Copy the commands shown on your new GitHub repository page under "…or push an existing repository from the command line". They will look like this:

1.  **Link your repository** (replace URL with yours):
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/ai-schedule-assistant.git
    ```

2.  **Rename branch to main**:
    ```bash
    git branch -M main
    ```

3.  **Push your code**:
    ```bash
    git push -u origin main
    ```

**Done!** Your code is now live on GitHub.
