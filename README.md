# Tails_tales






## Get Started
### Database Setup
1. Install PostgreSQL

Make sure PostgreSQL (version 14 or later) is installed and running.

2. Install pgvector extension
REFER TO: https://github.com/pgvector/pgvector
If you are using Linux and Mac:
```bash
cd /tmp
git clone --branch v0.8.2 https://github.com/pgvector/pgvector.git
cd pgvector
make
make install # may need sudo
```

If you are window users
```bash
set "PGROOT=C:\Program Files\PostgreSQL\18"
cd %TEMP%
git clone --branch v0.8.2 https://github.com/pgvector/pgvector.git
cd pgvector
nmake /F Makefile.win
nmake /F Makefile.win install
```

3. Create database
```bash
createdb pet_diary_db
```
4. Run Schema
```bash
psql -d pet_diary -f server/db/schema.sql
```

