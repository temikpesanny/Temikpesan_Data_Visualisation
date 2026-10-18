class NumericalIntegrator {
    // 1. Trapezoidal Rule
    static trapezoidal(f, a, b, n) {
        const h = (b - a) / n;
        let sum = f(a) + f(b);

        for (let i = 1; i < n; i++) {
            const x_i = a + i * h;
            sum += 2 * f(x_i);
        }

        return (h / 2) * sum;
    }

    // 2. Simpson's 1/3 Rule
    static simpson(f, a, b, n) {
        // Simpson's rule requires an even number of subintervals
        if (n % 2 !== 0) n += 1;

        const h = (b - a) / n;
        let sum = f(a) + f(b);

        // Odd indices
        for (let i = 1; i <= n / 2; i++) {
            const x_odd = a + (2 * i - 1) * h;
            sum += 4 * f(x_odd);
        }

        // Even indices
        for (let i = 1; i <= n / 2 - 1; i++) {
            const x_even = a + (2 * i) * h;
            sum += 2 * f(x_even);
        }

        return (h / 3) * sum;
    }

    // Automated Step Size Selection (Adaptive Refinement)
    static adaptiveIntegrate(method, f, a, b, tol = 1e-6, maxIter = 20) {
        let n = 2;
        let prevResult = method(f, a, b, n);

        for (let iter = 0; iter < maxIter; iter++) {
            n *= 2; // Halve step size h by doubling subintervals
            const currentResult = method(f, a, b, n);

            // Convergence check using step-doubling error estimation
            if (Math.abs(currentResult - prevResult) < tol) {
                return { result: currentResult, finalN: n, h: (b - a) / n };
            }
            prevResult = currentResult;
        }

        return { result: prevResult, finalN: n, h: (b - a) / n, maxIterReached: true };
    }
}

// Available predefined functions
const functions = {
    sin: { name: "f(x) = sin(x)", fn: Math.sin },
    x2: { name: "f(x) = x²", fn: x => x * x },
    exp: { name: "f(x) = e^x", fn: Math.exp },
    poly: { name: "f(x) = 3x³ - 2x + 5", fn: x => 3 * Math.pow(x, 3) - 2 * x + 5 }
};

// UI Handling Function
function calculateIntegration() {
    const fnKey = document.getElementById("funcSelect").value;
    const a = parseFloat(document.getElementById("intervalA").value);
    const b = parseFloat(document.getElementById("intervalB").value);
    const n = parseInt(document.getElementById("numIntervals").value, 10);
    const tol = parseFloat(document.getElementById("tolerance").value);

    if (isNaN(a) || isNaN(b) || isNaN(n) || n <= 0 || a >= b) {
        alert("Please enter valid parameters: 'a' must be less than 'b', and 'n' must be a positive integer.");
        return;
    }

    const selectedFn = functions[fnKey].fn;

    // Standard fixed-n calculation
    const trapVal = NumericalIntegrator.trapezoidal(selectedFn, a, b, n);
    const simpVal = NumericalIntegrator.simpson(selectedFn, a, b, n);

    // Adaptive step-size calculation
    const trapAdaptive = NumericalIntegrator.adaptiveIntegrate(NumericalIntegrator.trapezoidal, selectedFn, a, b, tol);
    const simpAdaptive = NumericalIntegrator.adaptiveIntegrate(NumericalIntegrator.simpson, selectedFn, a, b, tol);

    // Display Results
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <h3>Fixed Subintervals (n = ${n}):</h3>
        <p><strong>Trapezoidal Rule:</strong> ${trapVal.toFixed(8)}</p>
        <p><strong>Simpson's 1/3 Rule:</strong> ${simpVal.toFixed(8)}</p>

        <h3>Automated Step Size (Target Tolerance = ${tol}):</h3>
        <p><strong>Trapezoidal Rule:</strong> ${trapAdaptive.result.toFixed(8)} (Achieved with n = ${trapAdaptive.finalN}, h = ${trapAdaptive.h.toFixed(6)})</p>
        <p><strong>Simpson's 1/3 Rule:</strong> ${simpAdaptive.result.toFixed(8)} (Achieved with n = ${simpAdaptive.finalN}, h = ${simpAdaptive.h.toFixed(6)})</p>
    `;
}
