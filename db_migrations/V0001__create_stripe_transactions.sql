CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
    stripe_payment_intent VARCHAR(255),
    user_email VARCHAR(255),
    plan_id VARCHAR(50) NOT NULL,
    sestertius_amount INTEGER NOT NULL,
    price_usd NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_email ON transactions(user_email);
CREATE INDEX IF NOT EXISTS idx_transactions_session ON transactions(stripe_session_id);