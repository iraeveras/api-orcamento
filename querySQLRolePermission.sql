SELECT * FROM public."RolePermission"
ORDER BY id ASC 

INSERT INTO "RolePermission" (module, actions, scope, "roleId", "createdAt", "updatedAt")
VALUES (
  'acquisition-periods', 
  ARRAY['read','write','delete','export'], 
  'all', 
  1, 
  NOW(), 
  NOW()
);