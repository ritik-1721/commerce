const base_url = $("#base_url").attr("data-base_url");
const token = $("#base_url").attr("data-token");

const addCategory = async (event) => {
  $("#addCategoryError").html("");
  let category_name = strTrim($("#category_name").val());
  let parent_id = strTrim($("#hidden_parent_id").val());
  if (!isNotEmpty(category_name)) {
    $("#category_name").focus();
    $("#addCategoryError").html(
      `<center><font color='red'><b>Enter Category Name.</b></font></center>`
    );
  } else {
    $(event).prop("disabled", true);
    $("#addCategoryError").html(
      "<center><font color='blue'><b><i class='fa fa-spinner fa-spin'></i> Wait, Validating...</b></font></center>"
    );

    try {
      let body = {
        category_name,
      };
      if (parent_id != "" && parent_id != "0") body.parent_id = parent_id;
      const req = await fetch(`${base_url}api/category/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await req.json();
      if (data.ok === false) throw new Error(data.message);
      $("#addCategoryError").html(
        `<center><font color=green><b>${data.message}</b></font></center>`
      );
      // alert(content.message);
      getCategoryHieratchy();
      $("#category_name").val("");
    } catch (error) {
      $("#addCategoryError").html(
        `<center><font color='red'><b>${error.message}</b></font></center>`
      );
    }
    $(event).prop("disabled", false);
  }
};

const get_right_tree = (hierarchy) => {
  let list = "";
  if (hierarchy) {
    list += `<ul>`;
    hierarchy.map(function (ch) {
      list += `<li>
              <div 
                title="${ch.category_slug}" 
                onclick="$('#addCategoryModal').modal('show');$('#hidden_parent_id').val(${ch.category_id});$('#head_category_name').html($(this).text());" 
                >${ch.category_name}</div>`;
      if (ch.category_hierarchy.length > 0) {
        list += get_right_tree(ch.category_hierarchy);
      }
      list += `</li>`;
    });
    list += `</ul>`;
  }
  return list;
};

const getCategoryHieratchy = async () => {
  try {
    const req = await fetch(`${base_url}api/category/hieratchy`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await req.json();
    if (data.ok === false) throw new Error(data.message);
    const list = get_right_tree(data.allRecord);
    $("#hieratchyList").html(list);
  } catch (error) {
    $("#hieratchyList").html(
      `<font color='red'><b>${error.message}</b></font>`
    );
  }
};
$(document).ready(() => {
  getCategoryHieratchy();
});
