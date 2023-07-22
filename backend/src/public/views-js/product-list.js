const base_url = $("#base_url").attr("data-base_url");
const token = $("#base_url").attr("data-token");

const getImgsById = async (product_id) => {
  if (!isID(product_id)) {
    $("#ProductImagesDiv").html(
      `<div class="col-12"><center><font color=red><b>Invalid Id.</b></font></center></div>`
    );
  } else {
    $("#ProductImagesDiv").html(
      "<div class='col-12'><center><font color='blue'><b><i class='fa fa-spinner fa-spin'></i> Wait, Loading...</b></font></center></div>"
    );
    try {
      const res = await fetch(`${base_url}api/product/imgs/${product_id}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      if (data.ok === false) throw new Error(data.message);
      let txt = "";
      data.result.map((item) => {
        txt += `<div class=" col-6 col-sm-6 col-md-4 col-lg-3">
        <center>
        <img style="" src="${base_url}static/images/${item.img_name}?w=100&h=100" class="img-thumbnail"></center>
        </div>`;
      });

      $("#ProductImagesDiv").html(txt);
    } catch (error) {
      $("#ProductImagesDiv").html(
        `<div class='col-12'><center><font color=red><b>${error.message}</b></font></center></div>`
      );
    }
  }
};

const addProductImage = async (event) => {
  let product_id = $("#hidden_product_id").val();
  let image_description = $("#image_description").val();
  let priority = $("#priority").val();
  let image_file = $("#image_file").val();

  if (product_id == "") {
    $("#hidden_product_id").focus();
    $("#addProductImageError").html(
      `<center><font color=red><b>Invalid Product-ID.</b></font></center>`
    );
    // } else if (image_description == "") {
    //   $("#image_description").focus();
    //   $("#addProductImageError").html(
    //     `<center><font color=red><b>Enter Image Description.</b></font></center>`
    //   );
  } else if (priority == "") {
    $("#priority").focus();
    $("#addProductImageError").html(
      `<center><font color=red><b>Enter Image No.tle.</b></font></center>`
    );
  } else if (image_file == "") {
    $("#image_file").focus();
    $("#addProductImageError").html(
      `<center><font color=red><b>Enter Image File.</b></font></center>`
    );
  } else {
    $(event).prop("disabled", true);
    $("#addProductImageError").html(
      "<center><font color='blue'><b><i class='fa fa-spinner fa-spin'></i> Wait, Validating...</b></font></center>"
    );
    try {
      var formData = new FormData();
      formData.append("image_file", $("#image_file").prop("files")[0]);
      formData.append("product_id", product_id);
      formData.append("image_description", image_description);
      formData.append("priority", priority);
      const res = await fetch(`${base_url}api/product/add-img`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });
      const data = await res.json();
      if (data.ok === false) throw new Error(data.message);
      $("#addProductImageError").html(
        `<center><font color=green><b>${data.message}</b></font></center>`
      );
      $("#image_description").val("");
      $("#priority").val("");
      $("#image_file").val("");
      getImgsById(product_id);
    } catch (error) {
      $("#addProductImageError").html(
        `<center><font color=red><b>${error.message}</b></font></center>`
      );
    }
    $(event).prop("disabled", false);
  }
};

const getProduct = async () => {
  try {
    const req = await fetch(`${base_url}api/product/all`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await req.json();
    if (data.ok === false) throw new Error(data.message);
    let txt = "";
    txt += ` 
      <table class='table table-bordered table-sm table-hover' style='font-size:12px;' id='productListTbl'>
        <thead style='background-color:#efefef;'>
          <tr>
            <th>#</th>
            <th>Product Title</th>
            <th>Product Sub Title</th>
            <th>Product Description</th>
            <th>Product Code</th>
            <th>Category</th>
            <th>Attributes</th>
            <th>Product MRP (Rs.)</th>
            <th>Product MSP (Rs.)</th>
            <th>GST (%)</th>
            <th>In-Stock</th>
            <th>Display Status</th>
          </tr>
        </thead> `;
    data.result.map((item, index) => {
      txt += `<tr>`;
      txt += `<td>${index + 1}.</td>`;
      txt += `<td style="cursor: pointer;" title="App Product Image." onclick=' getImgsById(${item.product_id});$("#addProductImageModal").modal("show");$("#hidden_product_id").val(${item.product_id});'>${item.product_title}</td>`;
      txt += `<td>${item.product_sub_title}</td>`;
      txt += `<td>${item.product_description}</td>`;
      txt += `<td>${item.product_code}</td>`;
      txt += `<td>`;
      JSON.parse(item.categories).map((i, index) => {
        txt += `${index === 0 ? "" : ","}${i.category_name}`;
      });
      txt += `</td>`;
      txt += `<td>${item.attributes}</td>`;
      txt += `<td>${item.product_mrp}</td>`;
      txt += `<td>${item.product_msp}</td>`;
      txt += `<td>${item.gst_percentage}</td>`;
      txt += `<td></td>`;
      txt += `<td></td>`;
      txt += `</tr> `;
    });
    txt += `</table>`;
    $("#productList").html(txt);
    makeDataTable_Basic("productListTbl");
  } catch (error) {
    $("#productList").html(
      `<center><font color='red'><b>${error.message}</b></font></center>`
    );
  }
};
$(document).ready(() => {
  getProduct();
});
