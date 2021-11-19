<!DOCTYPE html>
<html lang="en">
<body>
  <a href="login.html">login</a>
  <form action="https://oauth2.googleapis.com/token" method="post" entype="application/x-www-form-urlencoded">
  code: <input  type="text" name="code" value="<?=$_GET['code']?>"><br>
  client_id: <input  type="text" name="client_id" value="320436277323-i5jk9fus5gv1egvohai2sd03ci2gomo2.apps.googleusercontent.com"><br>
  client_secret: <input  type="text" name="client_secret" value="Ax1MWIZrkN-4YyfEa7ZwJBOy"><br>
  redirect_uri: <input  type="text" name="redirect_uri" value="https://okzzinkyo.github.io/okzzinkyo.github.io-/example_List/pages/practice_Oauth/recieveCode.php"><br>
  grant_type: <input  type="text" name="grant_type" value="authorization_code"><br>
  <input type="submit">
</body>
</html>
