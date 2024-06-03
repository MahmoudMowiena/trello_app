# Cinnamon Trello-like Board Application

Cinnamon is a Trello-like application designed for efficient project management on a smaller scale. It features a single board where users can manage columns and cards with ease. The application ensures secure access with authentication and offers seamless drag-and-drop functionality for card management. The entire application is written in TypeScript for enhanced code quality and maintainability.

## Deployment

The application is deployed on Vercel. You can access it [here](https://trello-gcty7vcwe-mahmoud-mowienas-projects.vercel.app).

## Features

### Board Management
- Add, edit, and delete columns.
- Add, edit (title and description), and delete cards within columns.
- Drag and drop cards between columns.
- Attach images to cards.

### Authentication
- User registration and login via Supabase Auth.
- GitHub as an additional SSO provider.
- Middleware for protected routes, redirecting unauthenticated users to the login or register page.

### Design Principles
- SOLID Principles: The application adheres to SOLID principles, ensuring a robust and maintainable codebase.
- Clean Architecture: Implements clean architecture principles to separate concerns, enhance testability, and promote scalability.
- Middleware for protected routes, redirecting unauthenticated users to the login or register page.

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/)
  - [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd)
  - [TailwindCSS](https://tailwindcss.com/)

- **Backend:**
  - [Next.js API routes](https://nextjs.org/docs/api-routes/introduction)

- **Database:**
  - [Supabase](https://supabase.io/)
  - [Prisma ORM](https://www.prisma.io/)

- **Authentication:**
  - [Supabase Auth](https://supabase.io/docs/guides/auth)
  - [Supabase Auth Helpers](https://github.com/supabase/auth-helpers)

  ## Data Architecture

### ER Diagram

![ER Diagram](/public/ERD.jpg)

### Tables and Relationships

- **Columns**
  - id (Primary Key)
  - title
  - board_id (Foreign Key to Board)

- **Cards**
  - id (Primary Key)
  - title
  - description
  - image_file_name
  - column_id (Foreign Key to Columns)

- **Board**
  - id (Primary Key)
  - name

#### Relationships

- **Board to Columns:** One-to-Many (A board can have zero or multiple columns)
- **Columns to Cards:** One-to-Many (A column can have zero or multiple cards)

Visual Representation:
   ```bash
  Board (1) <----> (M) Columns (1) <----> (M) Cards
   ```

## Setup Instructions

### Prerequisites

- Node.js
- Supabase account

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/cinnamon.git
   cd cinnamon
   ```
2. **Install dependencies:**

    ```bash
    npm install
    ```
3. **Set up environment variables:**
    
    Create a .env.local file in the root directory and add     the following variables:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

4. **Set up Supabase:**

    - Create a new project in Supabase.
    - Set up the authentication providers (Email and GitHub).
    - Create the necessary tables and storage buckets as per your application's requirements.

5. **Run the application:**

    ```bash
    npm run dev
    ```

    The application should now be running on http://localhost:3000.

## Usage

- **Landing Page:** Access the Cinnamon board.
- **Authentication:** Register or log in to access the board.
- **Board Management:** Add, edit, delete columns and cards. Use drag and drop to move cards between columns. Attach images to cards.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/)
- [Prisma ORM](https://www.prisma.io/)

