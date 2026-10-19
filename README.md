# Pinwheel ADP CLI

CLI to interact w/ ADP data parsed from the ADP website https://adpemploymentreport.com/

The CLI tool uses playwright to navigate to the aforementioned ADP website and save off all .csv resources

## Installation

```bash
cd take-home
npm install -g pinwheel-cli
npx playwright install
```

### Usage

Opening terminal and performing `pinwheel-cli` will launch the interactive terminal session.

Initialization process saves off .csv files that the CLI can read.

Once initialization is finished, you'll have various choices in how you want to explore the data.

For example, I can select

```
> #s by Industry
> Historical
```

To then be prompted to type in a search year && select a month

```
> Type in your search year:
> Select Month
```

This should display console output similar to the following:

```
Number of ppl employed by Industry:
Industry: "Construction" # of ppl: 6076000.0
Industry: "Education and health services" # of ppl: 21002000.0
Industry: "Financial activities" # of ppl: 7743000.0
Industry: "Information" # of ppl: 2731000.0
Industry: "Leisure and hospitality" # of ppl: 14644000.0
Industry: "Manufacturing" # of ppl: 12233000.0
Industry: "Natural resources and mining" # of ppl: 1905000.0
Industry: "Other services" # of ppl: 4249000.0
Industry: "Professional and business services" # of ppl: 19270000.0
Industry: "Trade, transportation, and utilities" # of ppl: 26246000.0
```

### Approach & Key Tradeoffs

- I chose to use the ADP .csv requests in the HAR as opposed to parsing data a different way.
- The way things are currently designed ADP extraction is run on every cli > load instance.
- CLI was designed to only let users snapshot a single Month/Year

### How I evaluated forecast accuracy

- I'm using linear regression so I was able to evaluate answers against the derived linear regression equation

### What I'd update if I had more time

- Make it so ADP wasn't parsed on every cli session
- Update csv parsing so it doesn't happen every data exploration
- Add more error logging
- Add some more robustness around CSV file formats, urls, etc.
- unit tests
