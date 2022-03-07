# Guidelines for developers

## Recommendations for DB
- Do not store any sensitive data (e.g., password, database credentials) in your codebase
- Do not use quotes or whitespace in field names.
  e.g., Avoid names like FirstName, First Name, etc. Instead use first_name
- Identifiers should be written entirely in lower case. This includes tables, views, column, and everything else too. 
- Avoid using reserved words in tables, fields, etc.
  e.g., Do not use user, lock, view, etc.
- Use singular names for tables, views, etc. Do not use plural forms.
  e.g, avatar, client, etc. NOT avatars, clients, etc.
- For primary keys of type integer, consider using BIGINT rather than INT. It is even better to use GUID.
- Single column primary key fields should be named id. It's short, simple, and unambiguous.
  Foreign key fields should be a combination of the name of the referenced table and the name of the referenced fields.
  e.g., to refer id in table team you would name it as team_id
- Plan for regular backups? Create Nightly Backups with Cron
- Do not store images in databases rather store the path of the image (e.g., URL)
- TODO: audit log