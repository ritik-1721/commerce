const base_url=$('#base_url').attr('data-base_url');
const validate_login = async () => {
  var email = $("#user_email").val();
  var password = $("#user_password").val();
  if (!isEmail(email)) {
    $("#user_email").focus();
    $("#err_msg").html(
      "<font color='red'><b>Enter your valid Email-ID.</b></font>"
    );
  } else if (!isNotEmpty(password)) {
    $("#user_password").focus();
    $("#err_msg").html("<font color='red'><b>Enter your Password.</b></font>");
  } else {
    $("#login_btn").prop("disabled", true);
    $("#err_msg").html(
      "<font color='blue'><b><i class='fa fa-spinner fa-spin'></i> Wait, Validating...</b></font>"
    );
    try {
      let body = {
        email: strTrim(email),
        password: strTrim(password),
      };
      const req = await fetch(`${base_url}api/auth/admin-login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await req.json();
      if (data.ok === false) throw new Error(data.message);
      window.location = base_url + "admin/";
    } catch (error) {
      $("#err_msg").html(`<font color='red'><b>${error.message}</b></font>`);
    }
    $("#login_btn").prop("disabled", false);
  }
};
