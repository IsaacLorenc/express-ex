const express = require('express');
const app = express();

// Helper functions
function calculateMean(nums) {
    let sum = nums.reduce((acc, curr) => acc + curr, 0);
    return sum / nums.length;
}

function calculateMedian(nums) {
    nums.sort((a, b) => a - b);
    let middle = Math.floor(nums.length / 2);

    if (nums.length % 2 === 0) {
        return (nums[middle - 1] + nums[middle]) / 2;
    } else {
        return nums[middle];
    }
}

function calculateMode(nums) {
    let frequency = {};
    let maxFreq = 0;
    let mode = [];

    nums.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxFreq) {
            maxFreq = frequency[num];
        }
    });

    for (let num in frequency) {
        if (frequency[num] === maxFreq) {
            mode.push(Number(num));
        }
    }

    if (mode.length === nums.length) {
        return "No mode";
    } else {
        return mode;
    }
}

// Middleware to parse query parameters
app.use((req, res, next) => {
    if (!req.query.nums) {
        return res.status(400).json({ error: "nums are required" });
    }

    let nums = req.query.nums.split(',').map(num => {
        let parsed = parseFloat(num);
        if (isNaN(parsed)) {
            res.status(400).json({ error: `${num} is not a number` });
            return null;
        }
        return parsed;
    });

    if (nums.includes(null)) {
        return;
    }

    req.nums = nums;
    next();
});

// Routes
app.get('/mean', (req, res) => {
    let mean = calculateMean(req.nums);
    res.json({ operation: "mean", value: mean });
});

app.get('/median', (req, res) => {
    let median = calculateMedian(req.nums);
    res.json({ operation: "median", value: median });
});

app.get('/mode', (req, res) => {
    let mode = calculateMode(req.nums);
    res.json({ operation: "mode", value: mode });
});

module.exports = app;
app.listen(3000, () => { console.log('Server is running on port 3000') });

