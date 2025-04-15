# Mutation Testing

Mutation Testing is an advanced software testing technique where small changes are introduced to source code to check whether the existing test cases can detect faults. These mutants are slight variations of the original code that mimic common coding mistakes. If the tests catch the mutation and fail, the mutant is "killed." If the tests pass, the mutant "survives"—exposing a potential gap in test coverage.

## Why it matters:

Standard test coverage, like line or branch coverage, shows which parts of your code are being executed, but not necessarily tested well. Mutation testing pushes your tests to prove their worth. It helps ensure your tests are relevant and not just there.

## How does it work?

**Concepts and Workflows:**

- A mutation testing tool scans your code and applies mutations. 
   - Change > to <
   - Replace + with -
   - Return a different constant
- Each mutant version is tested against your test suite.
- The tool tracks whether the tests pass or fail for each mutant.
- A mutation score is calculated:
  - Mutation Score = (Mutatants Killed / Total Mutants) x 100%
 
**Tools:**
| Language        | Tool             |
|----------------|------------------|
| Java            | [PIT (PITest)](https://pitest.org/) |
| JavaScript/TS   | [StrykerJS](https://stryker-mutator.io/) |
| Python          | [MutPy](https://github.com/mutpy/mutpy) |
| .NET            | [Stryker.NET](https://stryker-mutator.io/) |

**Example:**

Original Code:
```java
public boolean isPositive(int number) {
    return number > 0;
}
```

Mutant Version:
```java
public boolean isPositive(int number) {
    return number >= 0;
}
```

## Connection to My Work:

As someone who wants to have a deeper understanding of quality assurance, mutation testing shifted the way I think about test coverage. It makes me realize that even well written tests can be fragile if they don't challenge the logic with edge cases or unexpected inputs. In future projects I hopw to use mutation testing together with unit testing to improve my tests.

## Takeaway:

Mutation testing doesn't just test your code but it also tests your tests.
It’s a resource tool that challenges already good tested code and it helps developers think more like adversaries to their own code.
