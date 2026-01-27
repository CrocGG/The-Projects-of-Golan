import json
import os
from enum import Enum
from typing import List, Dict, Optional

# Constants for file storage
FILE_NAME = "contacts.json"

class Actions(Enum):
    GET = 1
    CREATE = 2
    ANNIHILATE = 3
    EDIT = 4
    EXIT = 5

class PhoneBook:
    def __init__(self, filename: str):
        self.filename = filename
        self.contacts: List[Dict[str, str]] = []
        self.load_data()

    def load_data(self):
        """Loads contacts safely from JSON file."""
        if not os.path.exists(self.filename):
            # Initialize with an empty list if file doesn't exist
            self.save_data([]) 
        
        try:
            with open(self.filename, "r") as file:
                data = file.read()
                # Handle empty file case
                if not data:
                    self.contacts = []
                else:
                    self.contacts = json.loads(data)
        except (json.JSONDecodeError, IOError) as e:
            print(f"Error loading database: {e}. Starting with empty book.")
            self.contacts = []

    def save_data(self, data: Optional[List] = None):
        """Saves current contacts to file immediately."""
        to_save = data if data is not None else self.contacts
        try:
            with open(self.filename, "w") as file:
                json.dump(to_save, file, indent=4)
        except IOError as e:
            print(f"Error saving data: {e}")

    def list_contacts(self):
        print("\n--- Contact List ---")
        if not self.contacts:
            print("No contacts found.")
        for idx, contact in enumerate(self.contacts):
            print(f"{idx + 1}. {contact['first_name']} {contact['last_name']}")
        print("--------------------")

    def create_contact(self):
        print("\n--- Add New Contact ---")
        first_name = input("Enter first name: ").strip()
        last_name = input("Enter last name: ").strip()
        
        if not first_name or not last_name:
            print("Error: Names cannot be empty.")
            return

        new_contact = {"first_name": first_name, "last_name": last_name}
        self.contacts.append(new_contact)
        self.save_data() # Auto-save
        print(f"Saved: {first_name} {last_name}")

    def find_contact_index(self) -> int:
        """Helper to find a contact by name."""
        search = input("Enter the First Name of the contact: ").lower().strip()
        for i, contact in enumerate(self.contacts):
            if contact['first_name'].lower() == search:
                return i
        return -1

    def edit_contact(self):
        print("\n--- Edit Contact ---")
        idx = self.find_contact_index()
        if idx == -1:
            print("Contact not found.")
            return

        current = self.contacts[idx]
        print(f"Editing: {current['first_name']} {current['last_name']}")
        
        new_first = input(f"New First Name ({current['first_name']}): ").strip()
        new_last = input(f"New Last Name ({current['last_name']}): ").strip()

        # Only update if user typed something
        if new_first: self.contacts[idx]['first_name'] = new_first
        if new_last: self.contacts[idx]['last_name'] = new_last
        
        self.save_data()
        print("Contact updated.")

    def annihilate_contact(self):
        print("\n--- ANNIHILATE Contact ---")
        idx = self.find_contact_index()
        if idx == -1:
            print("Target not acquired (Contact not found).")
            return

        target = self.contacts[idx]
        confirm = input(f"Are you sure you want to annihilate {target['first_name']}? (y/n): ").lower()
        if confirm == 'y':
            self.contacts.pop(idx)
            self.save_data()
            print("Target annihilated.")
        else:
            print("Annihilation aborted.")

def get_menu_choice() -> Optional[Actions]:
    """Displays menu and safely handles user input."""
    print("\nMain Menu:")
    for action in Actions:
        print(f"{action.value}: {action.name}")
    
    try:
        choice = int(input("Select an action: "))
        return Actions(choice)
    except (ValueError, KeyError):
        print("Invalid selection. Please enter a number from the menu.")
        return None

if __name__ == "__main__":
    # 
    phone_book = PhoneBook(FILE_NAME)

    while True:
        selection = get_menu_choice()
        
        if selection == Actions.GET:
            phone_book.list_contacts()
        elif selection == Actions.CREATE:
            phone_book.create_contact()
        elif selection == Actions.ANNIHILATE:
            phone_book.annihilate_contact()
        elif selection == Actions.EDIT:
            phone_book.edit_contact()
        elif selection == Actions.EXIT:
            print("Goodbye!")
            break