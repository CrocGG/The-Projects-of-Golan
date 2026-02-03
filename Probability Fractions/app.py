import sys
from fractions import Fraction

def main():
    print("--- Fraction Probability Calculator ---")
    print("This program multiplies fractions to find the cumulative probability.\n")

    try:
        # 1. Get the number of fractions
        num_fractions = int(input("How many fractions do you want to calculate? "))
        
        if num_fractions < 1:
            print("Please enter a number greater than 0.")
            return

        # Initialize the total product as 1 (identity for multiplication)
        total_product = Fraction(1, 1)

        # 2. Get Numerator and Denominator for each
        for i in range(num_fractions):
            print(f"\nFraction #{i + 1}:")
            try:
                num = int(input("  Enter Numerator:   "))
                den = int(input("  Enter Denominator: "))
                
                if den == 0:
                    print("  Error: Denominator cannot be zero.")
                    return
                
                # Create the fraction and multiply it
                current_fraction = Fraction(num, den)
                total_product *= current_fraction
                
            except ValueError:
                print("  Error: Please enter valid whole numbers.")
                return

        # 3. Calculate and Format Results
        # The Fraction class automatically simplifies the result (e.g., 50/100 -> 1/2)
        final_fraction_str = str(total_product)
        
        # Convert to decimal for the probability
        probability_decimal = float(total_product)

        print("-" * 30)
        print("RESULTS")
        print("-" * 30)
        print(f"Final Fraction: {final_fraction_str}")
        # Format to exactly 3 decimal places
        print(f"Probability:    {probability_decimal:.3f}")
        print("-" * 30)

    except ValueError:
        print("\nError: Please enter a valid integer for the number of fractions.")

if __name__ == "__main__":
    main()