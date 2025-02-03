CREATE TABLE serviceType (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE serviceSubType (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    service_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES serviceType(id) ON DELETE CASCADE
);

CREATE TABLE supplierCompany (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activities TEXT,
    address_line_1 VARCHAR(255),
    address_line_2 VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(20),
    state VARCHAR(100),
    country VARCHAR(100),
    licence_no VARCHAR(100),
    service_type VARCHAR(255)
);

CREATE TABLE suppliersAccess (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    auth_id text,
    name VARCHAR(255) NOT NULL,
    supplier_company_id UUID NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    power VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_company_id) REFERENCES supplierCompany(id) ON DELETE CASCADE
);


CREATE TABLE services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    service_type VARCHAR(255),
    service_sub_type VARCHAR(255),
    description TEXT,
    duration INT[],  -- Array of integers to represent the duration
    cancellation_policy TEXT,
    features TEXT[],  -- Array of features
    includes TEXT[],  -- Array of included items
    excludes TEXT[],  -- Array of excluded items
    location VARCHAR(255),
    maximum_group_size INT,
    price DECIMAL(10, 2),
    special_benefits TEXT[],  -- Array of special benefits
    status VARCHAR(50),
    supplier_access_id UUID NOT NULL,  -- Foreign key from suppliersAccess table
    FOREIGN KEY (supplier_access_id) REFERENCES supplieraccess(id) ON DELETE CASCADE
);

CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile_no VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE servicebookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service_id UUID NOT NULL,  -- Foreign key from services table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    supplier_id UUID NOT NULL,  -- Foreign key from supplierCompany or suppliersAccess table
    payment_status VARCHAR(50),
    payment_intent_id UUID,
    created_by UUID NOT NULL,  -- Foreign key from users table
    pickup_location VARCHAR(255),
    city VARCHAR(100),
    street VARCHAR(255),
    address_line_1 VARCHAR(255),
    address_line_2 VARCHAR(255),
    postal_code VARCHAR(20),
    state VARCHAR(100),
    country VARCHAR(100),
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES supplieraccess(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE servicebookingperson (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,  -- Foreign key from users table
    service_id UUID NOT NULL,  -- Foreign key from services table
    supplier_id UUID NOT NULL,  -- Foreign key from suppliersAccess table
    booking_id UUID NOT NULL,  -- Foreign key from serviceBookings table
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES supplieraccess(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES servicebookings(id) ON DELETE CASCADE
);

CREATE TABLE servicecomments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,  -- Foreign key from users table
    service_id UUID NOT NULL,  -- Foreign key from services table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rating INT,  -- Rating value
    description TEXT,
    location VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

CREATE TABLE promoCode (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    supplier_id UUID NOT NULL,  -- Foreign key to the supplier (e.g., suppliersAccess table)
    discount DECIMAL(10, 2) NOT NULL,  -- Discount value (e.g., 10.50 for a 10.50% discount)
    status VARCHAR(50) NOT NULL,  -- Status of the promo code (e.g., "active", "expired")
    FOREIGN KEY (supplier_id) REFERENCES supplieraccess(id) ON DELETE CASCADE
);

create table contacts (
  id uuid default gen_random_uuid() primary key,  -- UUID for unique identifier
  created_at timestamptz default current_timestamp, -- Timestamp for creation date
  first_name text not null,  -- First name
  last_name text not null,   -- Last name
  email text not null unique, -- Email (unique constraint to prevent duplicates)
  message text               -- Message (optional field)
);

CREATE TABLE promocodes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY, -- Unique identifier
    code TEXT UNIQUE NOT NULL, -- Promo code text
    discount_value NUMERIC NOT NULL, -- Discount value
    min_ticket_price NUMERIC, -- Minimum ticket price for the promo code to apply
    created_at TIMESTAMPTZ DEFAULT NOW(), -- Timestamp of when the promo code is created
    end_date TIMESTAMPTZ, -- Expiration date of the promo code
    supplier_id UUID REFERENCES supplieraccess(id) ON DELETE CASCADE, -- Reference to the supplieraccess table
    service_id UUID REFERENCES services(id) ON DELETE CASCADE -- Reference to the service table
);

CREATE TABLE promocodeusages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY, -- Unique identifier
    promo_code_id UUID REFERENCES promo_codes(id) ON DELETE CASCADE, -- Reference to the promo codes table
    user_id UUID NOT NULL, -- Hardcoded user ID will be inserted dynamically
    service_id UUID REFERENCES services(id) ON DELETE CASCADE, -- Reference to the services table
    created_at TIMESTAMPTZ DEFAULT NOW() -- Timestamp of when the promo code is used
);

CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT NOT NULL,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    redirect_url TEXT,
    more_info TEXT,
    created_by TEXT DEFAULT 'admin' NOT NULL,
    image TEXT
);
