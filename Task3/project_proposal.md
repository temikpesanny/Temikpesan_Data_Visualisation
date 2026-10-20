# Project Proposal: Portfolio Risk Management Dashboard

### 1. Project Title

**Interactive Equity Portfolio Risk Analyzer Dashboard**

### 2. Project Description

The goal of this project is to build a simple, pure frontend web application that helps users analyze, track, and manage the financial risk of an investment portfolio consisting of traditional stocks. Managing risk is a vital pillar of classic portfolio management theory. This application will let a user input a custom mix of traditional stocks, track how risky that combination is in real time, and simulate historical market crashes to see how much money they could lose.

By building this project, I will translate core portfolio risk management concepts from my thesis into a highly visual, functional, and interactive software tool.

### 3. Data Source(s) and How to Use Them

To power the risk models with real market stock prices, the project will use a free, developer-friendly stock API:

* **Finnhub Stock API / Alpha Vantage (Free Tier):** I will use a standard JavaScript `fetch()` script to import real-time market quotes and historical timelines in a clean `JSON` format directly into the app using their free tiers.
* **How it will be used:** The app will take these raw numbers and run them through background JavaScript loops. These loops will automatically calculate the assets' **volatility** (how much the stock price swings) and **historical returns** to compute total portfolio risk levels.

### 4. Proposed Visualizations and Interactivity

The application frontend will be built using `React` as the foundation, paired with `Chart.js` to render clean, interactive charts:

* **Portfolio Asset Allocation Pie Chart:** A visual breakdown showing exactly what percentage of the user's money is tied up in each stock or asset class (e.g., Apple, Microsoft, S&P 500 Index).
* **Asset Price Volatility Bar Chart:** A side-by-side comparison chart showing which stocks in the portfolio have the highest price swings (risk) versus the most stable ones.
* **Value at Risk (VaR) Danger Meter:** A visual risk gauge showing the portfolio's "Value at Risk." This tells the investor the maximum amount of money they are likely to lose on a highly volatile market trading day.

#### Interactive Controls for the User:

* **Dynamic Portfolio Rebalancer:** Users can use input boxes or stepper buttons to change the percentage weight or amount of money in each stock. The charts will instantly animate and recalculate to show how the total portfolio risk changes.
* **Market Shock Simulator:** Sliders that let the user simulate an aggressive stock market crash (e.g., *"What happens if the stock market drops by 20%. The dashboard will automatically update in real-time to show the estimated cash loss.

### 5. Timeline for Completion

The project will be completed systematically over a 9-week pipeline leading to the end of the semester:

* **Weeks 1–3: Project Setup & API Connection**
  Create the core `React` frontend framework. Write the asynchronous data pipeline to successfully fetch raw `JSON` market data from the free public market API and verify it logs cleanly.
* **Weeks 4–6: Financial Math Engine & Chart Layouts**
  Write the standard JavaScript calculation logic for asset volatility and portfolio risk. Connect this math to `Chart.js` nodes to draw the initial pie, bar, and risk charts on screen.
* **Weeks 7–9: Interactivity Controls, Styling, & Git Submission**
  Hook up the slider controls and portfolio weight input fields so adjustments update the charts instantly. Apply final CSS styling for a polished look, clean up the files, and push the final codebase to my GitHub repository.
