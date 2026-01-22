import random
import re
from flask import Flask, render_template, request, session, redirect, url_for
import random
import re

# def print_header():
#     print("=" * 60)
#     print("       🎲  THE TARGET NUMBER CHALLENGE  🎲")
#     print("=" * 60)
#     print("INSTRUCTIONS:")
#     print("1. I will roll 4 dice and give you a TARGET number.")
#     print("2. You must use ALL 4 dice numbers to write an equation.")
#     print("3. You can use +, -, *, /, and () parentheses.")
#     print("4. Try to make your result equal the TARGET.")
#     print("   (Example: Dice [2, 3, 1, 4] -> Target 10 -> Input: (2+3)*1+4 )")
#     print("-" * 60)

# def roll_dice(n=4):
#     """Generates n random numbers between 1 and 6."""
#     return [random.randint(1, 6) for _ in range(n)]

# def get_target():
#     """Generates a random target number between 10 and 50."""
#     return random.randint(10, 50)

# def validate_input(user_input, dice_rolled):
#     """
#     Checks if the user used the correct numbers.
#     Returns: (is_valid, message)
#     """
#     # 1. Check for illegal characters (security and rules)
#     # Allow: digits, spaces, +, -, *, /, (, ), and .
#     if not re.match(r"^[0-9+\-*/().\s]+$", user_input):
#         return False, "Error: Invalid characters detected. Use numbers and math symbols only."

#     # 2. Extract numbers from user input
#     # Find all sequences of digits
#     user_numbers = [int(n) for n in re.findall(r'\d+', user_input)]
    
#     # 3. specific check: Did they use the dice rolled?
#     # We sort both lists to compare them regardless of order
#     if sorted(user_numbers) != sorted(dice_rolled):
#         return False, f"Error: You must use exactly the numbers rolled: {dice_rolled}"
    
#     return True, "Valid"

# def evaluate_expression(expression):
#     """Safe evaluation of the math expression."""
#     try:
#         # eval() is usually dangerous, but we restricted characters in validate_input
#         result = eval(expression)
#         return result
#     except ZeroDivisionError:
#         return None
#     except SyntaxError:
#         return None

# def game_loop():
#     score = 0
#     rounds = 3
    
#     print_header()
#     input("Press Enter to Start...")

#     for i in range(1, rounds + 1):
#         print(f"\n--- ROUND {i} of {rounds} ---")
        
#         dice = roll_dice()
#         target = get_target()
        
#         print(f"🎲  YOUR DICE: {dice}")
#         print(f"🎯  TARGET NUMBER: {target}")
        
#         while True:
#             expression = input("Enter your equation: ")
            
#             # Validation Step
#             is_valid, message = validate_input(expression, dice)
#             if not is_valid:
#                 print(f"❌ {message}")
#                 print("Try again.")
#                 continue
            
#             # Calculation Step
#             result = evaluate_expression(expression)
            
#             if result is None:
#                 print("❌ Invalid Math (Syntax error or Division by zero). Try again.")
#                 continue
                
#             print(f"🧮 You calculated: {expression} = {result}")
            
#             # Scoring Logic
#             diff = abs(target - result)
#             if diff == 0:
#                 print("🌟 PERFECT MATCH! (100 Points)")
#                 score += 100
#             elif diff <= 2:
#                 print(f"👍 So close! You were off by {diff}. (50 Points)")
#                 score += 50
#             elif diff <= 5:
#                 print(f"👌 Good effort. You were off by {diff}. (20 Points)")
#                 score += 20
#             else:
#                 print(f"📉 Too far off. (0 Points)")
            
#             break # Move to next round
            
#     print("=" * 60)
#     print(f"🏆 FINAL SCORE: {score} / {rounds * 100}")
#     if score == rounds * 100:
#         print("Rank: MATH WIZARD 🧙‍♂️")
#     elif score >= rounds * 50:
#         print("Rank: NUMBER CRUNCHER 🤖")
#     else:
#         print("Rank: ROOKIE 👶 (Keep practicing!)")
#     print("=" * 60)

# if __name__ == "__main__":
#     game_loop()


#################################
app = Flask(__name__)
app.secret_key = 'super_secret_educational_key'  # Required for keeping score

# --- GAME LOGIC FUNCTIONS ---
def roll_dice(n=4):
    return [random.randint(1, 6) for _ in range(n)]

def validate_input(user_input, dice_rolled):
    # 1. Check for illegal characters
    if not re.match(r"^[0-9+\-*/().\s]+$", user_input):
        return False, "Invalid characters! Only use numbers and +, -, *, /, ()."

    # 2. Extract numbers and check if they match the dice
    user_numbers = [int(n) for n in re.findall(r'\d+', user_input)]
    
    # Check length first
    if len(user_numbers) != len(dice_rolled):
         return False, f"You must use exactly {len(dice_rolled)} numbers."

    # Sort to compare content regardless of order
    if sorted(user_numbers) != sorted(dice_rolled):
        return False, f"You used the wrong numbers! You must use: {dice_rolled}"
    
    return True, "Valid"

def evaluate_expression(expression):
    try:
        return eval(expression)
    except:
        return None

# --- WEBSITE ROUTES ---

@app.route('/')
def home():
    # Start a new round if one isn't active
    if 'target' not in session:
        session['dice'] = roll_dice()
        session['target'] = random.randint(10, 50)
        session['score'] = session.get('score', 0)
        session['message'] = "Good Luck! Use Python math symbols: +, -, *, /"
        session['message_color'] = "text-primary" # Blue text
    
    return render_template('index.html', 
                           dice=session['dice'], 
                           target=session['target'],
                           score=session['score'],
                           message=session['message'],
                           color=session['message_color'])

@app.route('/check', methods=['POST'])
def check_answer():
    user_eqn = request.form['equation']
    dice = session.get('dice')
    target = session.get('target')

    # 1. Validate
    is_valid, msg = validate_input(user_eqn, dice)
    
    if not is_valid:
        session['message'] = f"⚠️ {msg}"
        session['message_color'] = "text-danger" # Red text
        return redirect(url_for('home'))

    # 2. Calculate
    result = evaluate_expression(user_eqn)
    
    if result is None:
        session['message'] = "⚠️ Syntax Error. Check your math symbols."
        session['message_color'] = "text-danger"
        return redirect(url_for('home'))

    # 3. Score
    diff = abs(target - result)
    
    if diff == 0:
        session['score'] += 100
        session['message'] = f"🌟 PERFECT! {user_eqn} = {result}. (+100 pts)"
        session['message_color'] = "text-success"
    elif diff <= 2:
        session['score'] += 50
        session['message'] = f"👍 Close! Result was {result}. (Off by {diff}) (+50 pts)"
        session['message_color'] = "text-warning"
    else:
        session['message'] = f"📉 Result was {result}. Too far from {target}."
        session['message_color'] = "text-muted"

    # Reset round logic for next roll
    session.pop('target') 
    return redirect(url_for('home'))

@app.route('/reset')
def reset():
    session.clear()
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)