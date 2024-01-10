CREATE TABLE Employees (
    Id INT PRIMARY KEY,
    Username NVARCHAR(255),
    Password NVARCHAR(255),
    DepartmentID INT
);

-- Create Departments table
CREATE TABLE Departments (
    Id INT PRIMARY KEY,
    Name NVARCHAR(255)
);

-- Create Log table
CREATE TABLE Log (
    Id INT PRIMARY KEY,
    Username NVARCHAR(255),
    LoginDate DATETIME
);
