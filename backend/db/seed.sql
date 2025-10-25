BEGIN TRANSACTION;

INSERT OR IGNORE INTO users (id, name, email, password, role)
VALUES
('admin-1', 'Admin', 'admin@sanjeevani.local', 'adminpass', 'admin');

INSERT OR IGNORE INTO blood_banks (id, name, city, address, phone, inventory_json)
VALUES
('bank-1', 'City Blood Bank', 'Mumbai', '123 Marine Drive', '+91-22-11111111', '{"A+":10,"A-":3,"B+":6,"B-":2,"O+":12,"O-":5,"AB+":1,"AB-":0}'),
('bank-2', 'Hope Blood Centre', 'Pune', '45 FC Road', '+91-20-22222222', '{"A+":5,"A-":1,"B+":8,"B-":2,"O+":7,"O-":2,"AB+":1,"AB-":0}');

COMMIT;
