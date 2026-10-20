# Test data

- `factories/` build valid, unique entities (§43–44). Every generated value carries a run marker (`utils/unique`) so cleanup can target it.
- Static pools (valid users, products…) belong in `pools/*.json` and are loaded per environment.
- **Never** store real personal data, passwords, tokens or card numbers here (§85).
