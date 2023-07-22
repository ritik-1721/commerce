const base_url = $("#base_url").attr("data-base_url");
const token = $("#base_url").attr("data-token");

$("form#data").submit(async (e) => {
  e.preventDefault();
  let title = $(`#title`).val();
  let sub_title = $(`#sub_title`).val();
  let description = $(`#description`).val();
  let tags = $(`#tags`).val();
  let categorysCheckedNum = $('input[name="categorys_array"]:checked').length;
  let product_code = $("input[name^=product_code]")
    .map((idx, elem) => $(elem).val())
    .get();
  if (title === "") {
    $("#title").focus();
    $("#error-message").html(
      `<center><font color=red ><b>Enter Product Title!</b></font></center>`
    );
  } else if (sub_title === "") {
    $("#sub_title").focus();
    $("#error-message").html(
      `<center><font color=red ><b>Enter Product Sub Title!</b></font></center>`
    );
  } else if (description === "") {
    $("#description").focus();
    $("#error-message").html(
      `<center><font color=red ><b>Enter Product Description!</b></font></center>`
    );
  } else if (tags === "") {
    $("#tags").focus();
    $("#error-message").html(
      `<center><font color=red ><b>Enter Product Tags!</b></font></center>`
    );
  } else if (!categorysCheckedNum || categorysCheckedNum <= 0) {
    $("#error-message").html(
      `<center><font color=red ><b>Select Categorys!</b></font></center>`
    );
  } else if (!product_code || product_code.length <= 0) {
    $("#product_code").focus();
    $("#error-message").html(
      `<center><font color=red ><b>Add Product!</b></font></center>`
    );
  } else {
    var formData = new FormData(document.getElementById("data")); //new FormData($("form#data"));
    $("#submit")
      .html("<i class='fa fa-spinner fa-spin'></i> Wait, Validating Data...")
      .prop("disabled", true);
    try {
      const req = await fetch(`${base_url}api/product/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });
      const data = await req.json();
      if (data.ok === false) throw new Error(data.message);
      $("#error-message").html(
        `<center><font color=green><b>${data.message}</b></font></center>`
      );
      $("#submit").html(
        "<i class='fa fa-check'></i> Data Saved Successfully..."
      );
      alert(data.message);
      location.reload();
    } catch (error) {
      $("#error-message").html(
        `<center><font color='red'><b>${error.message}</b></font></center>`
      );
      $("#submit").html("Save").prop("disabled", false);
    }
  }
});

const add = (e) => {
  var attribute_ids = $("#attribute_ids").val().split(",");
  let isValdate = true;

  //   attribute_ids.map((i) => {
  //     if (!isValdate) return;
  //     if ($(`#attribute_id_${i.trim()}`).val() == "0") {
  //       $(`#attribute_id_${i.trim()}`).focus();
  //       isValdate = false;
  //       return;
  //     }
  //   });

  let product_code = $("#product_code").val();
  let product_sku = $("#product_sku").val();
  let product_mrp = $("#product_mrp").val();
  let product_msp = $("#product_msp").val();
  let product_gst = $("#product_gst").val();
  if (!isValdate) {
    return false;
  } else if (product_code == "") {
    $("#product_code").focus(); //$("#error-message").html("");
    return false;
  } else if (product_sku == "") {
    $("#product_sku").focus();
    return false;
  } else if (product_mrp == "") {
    $("#product_mrp").focus();
    return false;
  } else if (product_msp == "") {
    $("#product_msp").focus();
    return false;
  } else if (product_gst == "") {
    $("#product_gst").focus();
    return false;
  } else {
    let tr = "<tr>";
    //${$( `#attribute_id_${i.trim()}` ).val()
    attribute_ids.map((i) => {
      tr += `
      <td align='center'> 
      ${
        $(`#attribute_id_${i.trim()}`).val() == 0
          ? ""
          : $(`#attribute_id_${i.trim()} option:selected`).text()
      } 
      <input type='hidden' readonly='true' name='attribute_id_${i.trim()}_array' value='${$(
        `#attribute_id_${i.trim()}`
      ).val()}' />
      </td>`;
    });
    tr += `
    <td align='center'>${product_code}<input type='hidden' readonly='true' name='product_code_array' value='${product_code}' /></td>
    <td align='center'>${product_sku}<input type='hidden' readonly='true' name='product_sku_array' value='${product_sku}' /></td>
    <td align='center'>${product_mrp}<input type='hidden' readonly='true' name='product_mrp_array' value='${product_mrp}' /></td>
    <td align='center'>${product_msp}<input type='hidden' readonly='true' name='product_msp_array' value='${product_msp}' /></td>
    <td align='center'>${product_gst}<input type='hidden' readonly='true' name='product_gst_array' value='${product_gst}' /></td>
    </tr>
     `;
    $("#product_table tr:last").after(tr);
    $("#product_code,#product_sku,#product_mrp,#product_msp,#product_gst").val(
      ""
    );
    return false;
  }
};
