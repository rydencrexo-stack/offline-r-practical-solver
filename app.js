
"use strict";

/*
 * OFFLINE R PRACTICAL SOLVER
 * Source: SWRP Practical — Copy/Paste Friendly PDF
 *
 * Supported questions:
 * Module 1: Q1-Q11
 * Module 2: Q1-Q9
 *
 * No API, backend, external library, or internet required.
 */

const $ = (id) => document.getElementById(id);

const moduleSelect = $("module");
const questionInput = $("question");
const questionCount = $("question-count");
const solveButton = $("solve-btn");
const copyButton = $("copy-btn");
const clearButton = $("clear-btn");
const resultTitle = $("result-title");
const codeContent = $("code-content");
const messageBox = $("message");
const resultInfo = $("result-info");

const INITIAL_OUTPUT =
    "Enter a practical question above to find its matching solution.";

/*
 * Question bank.
 *
 * Each group contains alternative words or phrases.
 * More groups matching a question produce a higher score.
 *
 * Add new questions here only when they are supported
 * by the approved SWRP practical syllabus.
 */

const questionBank = [
    {
        id: "M1-Q1",
        module: "module1",
        title: "Arithmetic and relational operators",
        minScore: 3,
        groups: [
            ["arithmetic operations", "arithmetic operators"],
            ["relational operators", "comparison operators"],
            ["%/%", "integer division"],
            ["%%", "modulus", "remainder"],
            ["accept two numbers", "two numbers from the user"],
            ["^", "exponentiation", "power operator"]
        ],
        code: `a <- as.numeric(readline("Enter a: "))
b <- as.numeric(readline("Enter b: "))

cat("Addition =", a + b, "\\n")
cat("Subtraction =", a - b, "\\n")
cat("Multiplication =", a * b, "\\n")

if (b != 0) {
  cat("Division =", a / b, "\\n")
  cat("Modulus =", a %% b, "\\n")
  cat("Integer division =", a %/% b, "\\n")
} else {
  cat("Division by zero is undefined.\\n")
}

cat("Power =", a ^ b, "\\n")

print(a > b)
print(a < b)
print(a >= b)
print(a <= b)
print(a == b)
print(a != b)`
    },

    {
        id: "M1-Q2",
        module: "module1",
        title: "Miscellaneous operators",
        minScore: 2,
        groups: [
            ["miscellaneous operators"],
            [": operator", "colon operator", "1:5"],
            ["%in%", "membership operator"],
            ["%*%", "matrix multiplication"]
        ],
        code: `x <- 1:5
print(x)

print(3 %in% x)

A <- matrix(1:4, 2)
print(A %*% A)`
    },

    {
        id: "M1-Q3",
        module: "module1",
        title: "Nested if-else statements",
        minScore: 3,
        groups: [
            ["nested if", "nested if else"],
            ["between 10 and 20"],
            ["greater than 20"],
            ["less than or equal to 10"]
        ],
        code: `n <- as.numeric(readline("Enter a number: "))

if (n > 10) {
  if (n <= 20) {
    print("Between 10 and 20")
  } else {
    print("Greater than 20")
  }
} else {
  print("Less than or equal to 10")
}`
    },

    {
        id: "M1-Q4",
        module: "module1",
        title: "Age and gender classification",
        minScore: 3,
        groups: [
            ["logical operators"],
            ["age and gender", "age gender"],
            ["adult male"],
            ["adult female"],
            ["if else if", "else if"]
        ],
        code: `age <- as.numeric(readline("Enter age: "))
gender <- readline("Enter gender: ")

if (age >= 18 && gender == "Male") {
  print("Adult Male")
} else if (age >= 18 && gender == "Female") {
  print("Adult Female")
} else {
  print("Minor")
}`
    },

    {
        id: "M1-Q5",
        module: "module1",
        title: "Positive number and greater than 25",
        minScore: 2,
        groups: [
            ["positive number", "positive or negative"],
            ["greater than 25"],
            ["b is greater than 25"],
            ["if else statement", "if else condition"]
        ],
        code: `n <- as.numeric(readline("Enter a number: "))

if (n > 0) {
  print("Positive")
} else {
  print("Not positive")
}

b <- as.numeric(readline("Enter b: "))

if (b > 25) {
  print("b is greater than 25")
} else {
  print("b is less than 25")
}`
    },

    {
        id: "M1-Q6",
        module: "module1",
        title: "While and repeat loop sums",
        minScore: 3,
        groups: [
            ["while loop"],
            ["repeat loop"],
            ["sum of the first five natural numbers"],
            ["first five natural numbers"]
        ],
        code: `i <- 1
s <- 0

while (i <= 5) {
  s <- s + i
  i <- i + 1
}

print(s)

i <- 1
s <- 0

repeat {
  s <- s + i
  i <- i + 1

  if (i > 5) break
}

print(s)`
    },

    {
        id: "M1-Q7",
        module: "module1",
        title: "For loop and repeat with next",
        minScore: 3,
        groups: [
            ["for loop"],
            ["iteration", "iteration :"],
            ["even numbers from 1 to 10"],
            ["next statement"],
            ["repeat loop"]
        ],
        code: `for (i in 1:5) {
  print(paste("Iteration :", i))
}

i <- 0

repeat {
  i <- i + 1

  if (i > 10) break
  if (i %% 2 != 0) next

  print(i)
}`
    },

    {
        id: "M1-Q8",
        module: "module1",
        title: "Vector creation and indexing",
        minScore: 3,
        groups: [
            ["numeric logical and character", "mixed data types"],
            ["vector from the keyboard", "accepting values from the keyboard", "scan()"],
            ["1 to 7", "1:7"],
            ["3rd element", "third element"],
            ["2nd and 4th elements", "second and fourth elements"],
            ["except the 1st element", "except the first element"],
            ["except the 2nd element", "except the second element"]
        ],
        code: `x <- c(1, TRUE, "hello")
print(typeof(x))

v <- scan()

a <- 1:7

print(a[3])
print(a[c(2, 4)])
print(a[-1])
print(a[-2])`
    },

    {
        id: "M1-Q9",
        module: "module1",
        title: "Logical indexing and named vectors",
        minScore: 3,
        groups: [
            ["logical indexing"],
            ["named vector"],
            ["replace all elements less than 0 with 5"],
            ["elements less than 0", "negative elements"],
            ["modify its elements", "assignment operator"]
        ],
        code: `x <- 1:5

print(x[c(TRUE, FALSE, TRUE, FALSE, TRUE)])
print(x[x > 3])

marks <- c(Amit = 80, Priya = 90)
print(marks["Amit"])

x <- c(1, -2, 3, -4)
x[1] <- 10
x[x < 0] <- 5

print(x)`
    },

    {
        id: "M1-Q10",
        module: "module1",
        title: "Three-dimensional array and list indexing",
        minScore: 3,
        groups: [
            ["three dimensional array", "3d array"],
            ["2nd column of the 1st matrix", "second column of the first matrix"],
            ["1st row of the 2nd matrix", "first row of the second matrix"],
            ["single brackets", "double brackets", "[[]]"],
            ["typeof()"],
            ["named list"]
        ],
        code: `a <- array(1:24, dim = c(2, 3, 4))

print(a[, 2, 1])
print(a[1, , 2])

x <- list(name = "Amit", age = 20)

print(x["name"])
print(x[["name"]])

print(typeof(x["name"]))
print(typeof(x[["name"]]))`
    },

    {
        id: "M1-Q11",
        module: "module1",
        title: "Data frame creation and modification",
        minScore: 3,
        groups: [
            ["data frame"],
            ["serial number", "sr number", "sr age name"],
            ["stringsasfactors"],
            ["typeof()", "class()", "structure"],
            ["add a new row", "new row"],
            ["add a new column", "new column"]
        ],
        code: `df <- data.frame(
  sr = 1:3,
  age = c(18, 19, 20),
  name = c("A", "B", "C"),
  stringsAsFactors = FALSE
)

print(df)
print(typeof(df))
print(class(df))
str(df)

df <- rbind(
  df,
  data.frame(sr = 4, age = 21, name = "D")
)

df$marks <- c(80, 85, 90, 95)

print(df)`
    },

    {
        id: "M2-Q1",
        module: "module2",
        title: "Dataset statistics: Education and Wellness Tourism",
        minScore: 4,
        groups: [
            ["physical wellbeing"],
            ["wellness tourism"],
            ["education"],
            ["gender"],
            ["trim = 0.2", "trim 0.2"],
            ["mean", "median", "standard deviation"]
        ],
        code: `print(data)
head(data)
str(data)

mean(data$Gender)
mean(data$Gender, na.rm = TRUE)

mean(data$Education, na.rm = TRUE)
mean(data$Education, na.rm = TRUE, trim = 0.2)

median(data$Physical_Wellbeing, na.rm = TRUE)
median(data$Attraction, na.rm = TRUE)

sd(data$Education, na.rm = TRUE)

sum(data$Wellness_Tourism, na.rm = TRUE)
min(data$Wellness_Tourism, na.rm = TRUE)
max(data$Wellness_Tourism, na.rm = TRUE)
range(data$Wellness_Tourism, na.rm = TRUE)`
    },

    {
        id: "M2-Q2",
        module: "module2",
        title: "Dataset statistics: Income and Spending",
        minScore: 4,
        groups: [
            ["income"],
            ["spending on wellness tourism", "spending_on_wellness_tourism"],
            ["revisit intention", "revisit_intention"],
            ["trim = 0.35", "trim 0.35"],
            ["trim = 0.4", "trim 0.4"],
            ["mean", "median", "standard deviation"]
        ],
        code: `print(data)
head(data)
names(data)
str(data)

mean(data$Income)
mean(data$Income, na.rm = TRUE)
mean(data$Income, na.rm = TRUE, trim = 0.35)

mean(data$Spending_on_Wellness_Tourism, na.rm = TRUE)
mean(data$Spending_on_Wellness_Tourism,
     na.rm = TRUE, trim = 0.4)

median(data$Revisit_Intention, na.rm = TRUE)
sd(data$Income, na.rm = TRUE)

sum(data$Spending_on_Wellness_Tourism, na.rm = TRUE)
min(data$Spending_on_Wellness_Tourism, na.rm = TRUE)
max(data$Spending_on_Wellness_Tourism, na.rm = TRUE)
range(data$Spending_on_Wellness_Tourism, na.rm = TRUE)`
    },

    {
        id: "M2-Q3",
        module: "module2",
        title: "Temperature bar plot and binomial probability",
        minScore: 3,
        groups: [
            ["maximum temperature", "temperature in a week"],
            ["bar plot", "barplot"],
            ["sun mon tue wed thu fri sat"],
            ["horiz = true", "horizontally", "horizontal"],
            ["dbinom", "probability mass function"],
            ["4 successes in 6 trials", "success probability 0.4"]
        ],
        code: `temp <- sample(20:45, 7, replace = TRUE)

days <- c("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat")

barplot(
  temp,
  names.arg = days,
  main = "Maximum Temperature in a Week",
  xlab = "Temperature",
  ylab = "Day",
  col = "skyblue",
  horiz = TRUE,
  density = 10
)

dbinom(4, 6, 0.4)`
    },

    {
        id: "M2-Q4",
        module: "module2",
        title: "Passenger survival stacked bar plot",
        minScore: 3,
        groups: [
            ["survival of each class", "survived and non survived"],
            ["1st class", "2nd class", "3rd class", "crew"],
            ["stacked bar plot", "barplot"],
            ["legend"],
            ["dnorm(0)", "standard normal distribution"]
        ],
        code: `x <- matrix(
  c(122, 203, 167, 118, 528, 178, 673, 212),
  nrow = 2
)

colnames(x) <- c("1st", "2nd", "3rd", "Crew")
rownames(x) <- c("Survived", "Not Survived")

barplot(
  x,
  main = "Survival of Each Class",
  xlab = "Class",
  col = c("green", "red"),
  legend = rownames(x)
)

dnorm(0)`
    },

    {
        id: "M2-Q5",
        module: "module2",
        title: "Pair plot and normal random numbers",
        minScore: 3,
        groups: [
            ["pair plot", "pairs(df)"],
            ["var1", "var2", "var3"],
            ["50 random observations", "50 random numbers"],
            ["mean 10", "mean = 10"],
            ["sd 2", "sd = 2"],
            ["normal distribution"]
        ],
        code: `df <- data.frame(
  var1 = runif(50, 1, 100),
  var2 = runif(50, 1, 100),
  var3 = runif(50, 1, 100)
)

pairs(df, main = "Pair Plot of var1, var2, var3")

rnorm(10, mean = 10, sd = 2)`
    },

    {
        id: "M2-Q6",
        module: "module2",
        title: "Monthly expenses pie chart and normal CDF",
        minScore: 3,
        groups: [
            ["monthly expense breakdown", "monthly expenses"],
            ["pie chart"],
            ["housing", "clothes", "entertainment"],
            ["pnorm", "cumulative distribution function"],
            ["mean 5", "mean = 5"],
            ["sd 2", "sd = 2"]
        ],
        code: `x <- c(600, 300, 150, 250, 200)

labels <- c(
  "Other", "Housing", "Clothes", "Food", "Entertainment"
)

pie(
  x,
  labels = labels,
  col = c("red", "orange", "yellow", "blue", "green"),
  main = "Monthly Expense Breakdown"
)

pnorm(3, mean = 5, sd = 2)`
    },

    {
        id: "M2-Q7",
        module: "module2",
        title: "3D pie chart and normal random numbers",
        minScore: 3,
        groups: [
            ["3d pie chart", "pie3d"],
            ["plotrix"],
            ["monthly expense breakdown", "monthly expenses"],
            ["housing", "clothes", "entertainment"],
            ["rnorm(50)", "50 random numbers from a normal distribution"]
        ],
        code: `# Install plotrix only if it is not already installed.
# Installation requires internet if the package is unavailable.
library(plotrix)

pie3D(
  c(600, 300, 150, 250, 200),
  labels = c("Other", "Housing", "Clothes", "Food", "Entertainment"),
  col = c("red", "orange", "yellow", "blue", "green"),
  main = "Monthly Expense Breakdown"
)

rnorm(50)`
    },

    {
        id: "M2-Q8",
        module: "module2",
        title: "Contingency table with renamed labels and totals",
        minScore: 4,
        groups: [
            ["contingency table"],
            ["gender and smoking status", "gender smoker"],
            ["proportion tables", "prop.table"],
            ["rename rows", "women and men"],
            ["non smoker", "non-smoker"],
            ["add row and column totals", "addmargins"],
            ["str(tab)", "structure"]
        ],
        code: `Gender <- factor(
  c("Male", "Female", "Male", "Female", "Male", "Female")
)

Smoker <- factor(c("yes", "no", "yes", "no", "yes", "no"))

df <- data.frame(Gender, Smoker)

tab <- table(df$Gender, df$Smoker)
print(tab)

prop.table(tab)
prop.table(tab, 1)
prop.table(tab, 2)

tab <- tab[c("Female", "Male"), c("no", "yes")]

rownames(tab) <- c("Women", "Men")
colnames(tab) <- c("Non-smoker", "Smoker")

addmargins(tab)
str(tab)`
    },

    {
        id: "M2-Q9",
        module: "module2",
        title: "Contingency table and subsetting",
        minScore: 4,
        groups: [
            ["contingency table"],
            ["gender and smoking status", "gender smoker"],
            ["proportion tables", "prop.table"],
            ["first three rows", "tab[1:3"],
            ["first column", "tab[1:3,1]"],
            ["first two columns", "tab[1:3,1:2]"],
            ["column labelled yes", 'tab[,"yes"]', 'tab[, "yes"]'],
            ["columns yes and no", 'c("yes","no")']
        ],
        code: `Gender <- factor(
  c("Male", "Female", "Male", "Female", "Male", "Female")
)

Smoker <- factor(c("yes", "no", "yes", "no", "yes", "no"))

df <- data.frame(Gender, Smoker)

tab <- table(df$Gender, df$Smoker)
print(tab)

prop.table(tab)
addmargins(prop.table(tab))

tab[1:3, ]
tab[1:3, 1]
tab[1:3, 1:2]
tab[, "yes"]
tab[1:3, c("yes", "no")]`
    }
];

/*
 * Normalize text without destroying R operators such as %in% and %*%.
 * Underscores become spaces so natural-language questions can match
 * dataset column names from the PDF.
 */

function normalizeText(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/[^a-z0-9%]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function groupMatches(normalizedQuestion, alternatives) {
    return alternatives.some((alternative) => {
        const term = normalizeText(alternative);

        if (!term) return false;

        return (` ${normalizedQuestion} `).includes(` ${term} `);
    });
}

function scoreQuestion(question, entry) {
    const normalizedQuestion = normalizeText(question);
    let score = 0;
    const matchedGroups = [];

    for (const group of entry.groups) {
        if (groupMatches(normalizedQuestion, group)) {
            score += 1;
            matchedGroups.push(group);
        }
    }

    /*
     * A module filter is applied separately.
     * Matching groups must meet the entry's minimum threshold.
     */
    return {
        entry,
        score,
        matchedGroups
    };
}

function findBestMatch(question, selectedModule) {
    const candidates = questionBank
        .filter((entry) => {
            return selectedModule === "all" ||
                entry.module === selectedModule;
        })
        .map((entry) => scoreQuestion(question, entry))
        .filter((result) => result.score >= result.entry.minScore)
        .sort((a, b) => b.score - a.score);

    if (candidates.length === 0) {
        return null;
    }

    const best = candidates[0];
    const second = candidates[1];

    /*
     * Reject ambiguous questions instead of guessing.
     * A tie is accepted only when the top result has a sufficiently
     * strong, distinctive match.
     */
    if (
        second &&
        best.score === second.score &&
        best.score < best.entry.minScore + 2
    ) {
        return {
            ambiguous: true
        };
    }

    return best;
}

function showMessage(text) {
    messageBox.textContent = text;
    messageBox.hidden = !text;
}

function showUnsupported(message) {
    resultTitle.textContent = "Question not recognised";
    codeContent.textContent =
        "Unsupported question. Please use a question from the SWRP practical PDF.";

    resultInfo.textContent = "No solution generated";
    copyButton.disabled = true;

    showMessage(message);
}

function solveQuestion() {
    const question = questionInput.value.trim();
    const selectedModule = moduleSelect.value;

    if (!question) {
        showUnsupported("Enter a practical question first.");
        return;
    }

    const result = findBestMatch(question, selectedModule);

    if (!result) {
        showUnsupported(
            "No confident match was found in the selected question bank. " +
            "Try including the topic, operation, dataset column names, " +
            "or other distinctive details from the original question."
        );
        return;
    }

    if (result.ambiguous) {
        showUnsupported(
            "This question matches multiple practicals. Add more details " +
            "or select the correct module to narrow the search."
        );
        return;
    }

    resultTitle.textContent = result.entry.title;
    codeContent.textContent = result.entry.code;
    resultInfo.textContent =
        `${result.entry.id} · ${result.entry.module === "module1" ? "Module 1" : "Module 2"}`;

    copyButton.disabled = false;
    showMessage("");
}

async function copyCode() {
    if (copyButton.disabled) return;

    const code = codeContent.textContent;

    try {
        /*
         * Clipboard API may be unavailable for file:// pages.
         * Try it first, then use a temporary textarea as a fallback.
         */
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(code);
        } else {
            throw new Error("Clipboard API unavailable");
        }

        showMessage("Code copied successfully.");
    } catch (error) {
        const temporary = document.createElement("textarea");
        temporary.value = code;
        temporary.setAttribute("readonly", "");
        temporary.style.position = "fixed";
        temporary.style.opacity = "0";

        document.body.appendChild(temporary);
        temporary.select();

        let copied = false;

        try {
            copied = document.execCommand("copy");
        } catch (copyError) {
            copied = false;
        }

        temporary.remove();

        showMessage(
            copied
                ? "Code copied successfully."
                : "Automatic copy is unavailable. Select the code and copy it manually."
        );
    }
}

function clearForm() {
    questionInput.value = "";
    questionCount.textContent = "0 characters";

    resultTitle.textContent = "Your R code will appear here";
    codeContent.textContent = INITIAL_OUTPUT;
    resultInfo.textContent = "Waiting for a question";

    copyButton.disabled = true;
    showMessage("");

    questionInput.focus();
}

function updateCharacterCount() {
    questionCount.textContent =
        `${questionInput.value.length} characters`;
}

/*
 * Example buttons load questions into the input.
 * They do not bypass the matching engine.
 */

document.querySelectorAll(".example-btn").forEach((button) => {
    button.addEventListener("click", () => {
        questionInput.value = button.dataset.question || "";
        moduleSelect.value = button.dataset.module || "all";

        updateCharacterCount();
        solveQuestion();
    });
});

solveButton.addEventListener("click", solveQuestion);
copyButton.addEventListener("click", copyCode);
clearButton.addEventListener("click", clearForm);

questionInput.addEventListener("input", updateCharacterCount);

questionInput.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        solveQuestion();
    }
});

/*
 * Initial state.
 */

updateCharacterCount();
copyButton.disabled = true;

console.info(
    `Offline R Practical Solver loaded ${questionBank.length} question entries.`
);
