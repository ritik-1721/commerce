const base_url = $("#base_url").attr("data-base_url");
const token = $("#base_url").attr("data-token");

const addAttributeValue = async (event) => {
  $("#addAttributeValueError").html("");
  let attribute_value_type = strTrim($("#hidden_attribute_value_type").val());
  let attribute_id = strTrim($("#hidden_attribute_id").val());
  let attribute_description = strTrim($("#attribute_description").val());
  let attribute_value = strTrim($("#attribute_value").val());
  if (attribute_id == "" || attribute_id == "0") {
    $("#hidden_attribute_id").focus();
    $("#addAttributeValueError").html(
      `<center><font color='red'><b>Attribute-Id</b></font></center>`
    );
  } else if (attribute_value == "") {
    $("#attribute_value").focus();
    $("#addAttributeValueError").html(
      `<center><font color='red'><b>Enter Attribute Value.</b></font></center>`
    );
  } else if (attribute_description == "") {
    $("#attribute_description").focus();
    $("#addAttributeValueError").html(
      `<center><font color='red'><b>Enter Attribute Description.</b></font></center>`
    );
  }
  try {
    var formData = new FormData();
    formData.append("attribute_id", attribute_id);
    formData.append("attribute_type", attribute_value_type);
    formData.append("attribute_value_description", attribute_description);
    attribute_value =
      attribute_value_type === "file"
        ? $("#attribute_value")[0].files[0]
        : attribute_value;
    formData.append("attribute_value", attribute_value);
    const req = await fetch(`${base_url}api/attribute-value/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData, // JSON.stringify(body),
    });
    const data = await req.json();
    if (data.ok === false) throw new Error(data.message);
    $("#addAttributeValueError").html(
      `<center><font color=green><b>${data.message}</b></font></center>`
    );
    $("#attribute_value").val("");
    $("#attribute_description").val("");
    getAttributeValueList(attribute_id, attribute_value_type);
  } catch (error) {
    $("#addAttributeValueError").html(
      `<center><font color=red><b>${error.message}</b></font></center>`
    );
  }
};

const addAttribute = async () => {
  $("#addAttributeError").html("");
  let attribute_name = strTrim($("#attribute_name").val());
  let attribute_value_type = strTrim($("#attribute_value_type").val());
  if (!isNotEmpty(attribute_name)) {
    $("#attribute_name").focus();
    $("#addAttributeError").html(
      `<center><font color=red><b>Enter Attribute Name.</b></font></center>`
    );
  } else if (!isNotEmpty(attribute_value_type)) {
    $("#attribute_value_type").focus();
    $("#addAttributeError").html(
      `<center><font color=red><b>Select Attribute Value Type.</b></font></center>`
    );
  } else {
    try {
      let body = {
        attribute_name,
        attribute_value_type,
      };
      const req = await fetch(`${base_url}api/attribute/add`, {
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
      $("#addAttributeError").html(
        `<center><font color=green><b>${data.message}</b></font></center>`
      );
      getAttributeList();
      $("#attribute_name").val("");
      $("#attribute_value_type").val("text");
    } catch (error) {
      $("#addAttributeError").html(
        `<center><font color=red><b>${error.message}</b></font></center>`
      );
    }
  }
};
const getAttributeList = async () => {
  $("#attributeList").html("");
  try {
    const res = await fetch(`${base_url}api/attribute/all`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.ok === false) throw new Error(data.message);
    let list = `<ul>`;
    data.allRecord.map(function (ch) {
      list += `<li>
                <div 
                  title="${ch.attribute_name}" 
                  onclick="openAttributeModal('${ch.attribute_id}','${ch.attribute_value_type}');" 
                  >${ch.attribute_name}</div>`;
      list += `</li>`;
    });
    list += `</ul>`;

    $("#attributeList").html(list);
  } catch (error) {
    $("#attributeList").html(
      `<center><font color=red><b>${error.message}</b></font></center>`
    );
  }
};

const openAttributeModal = (attribute_id, type) => {
  if (type === "color") {
    $("#attribute_value").css("height", "43px");
  }
  $("#attribute_value").attr("type", type);
  $("#attribute_value").val("");

  $("#addAttributeValueModal").modal("show");
  $("#hidden_attribute_value_type").val(type);
  $("#hidden_attribute_id").val(attribute_id);
  getAttributeValueList(attribute_id, type);
};

const getAttributeValueList = async (attribute_id, type) => {
  if (attribute_id == "" || attribute_id == "0") {
    $("#attribute_value_list").html(
      `<center><font color=red><b>Invalid Attribute-ID.</b></font></center>`
    );
  } else {
    try {
      const res = await fetch(
        `${base_url}api/attribute-value/all-by-attribute/${attribute_id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.ok === false) throw new Error(data.message);
      let txt = "";
      txt += ` 
      <table class='table table-bordered table-sm table-hover' style='font-size:12px;' id='attributeValueListTbl'>
                  <thead style='background-color:#efefef;'>
                    <tr>
                      <th>#</th>
                      <th>Value</th>
                      <th>Description</th>
                    </tr>
                  </thead> `;

      data.records.map((item, index) => {
        txt += `<tr>`;
        txt += `<td>${index + 1}.</td>`;

        switch (type) {
          case "color": {
            txt +=   `<td> <div style='background-color:${item.attribute_value};' >&nbsp;</div> </td>`;
            break;
          }
          case "text": {
            txt +=  `<td>${item.attribute_value}</td>`;
            break;
          }
          case "number": {
            txt +=  `<td>${item.attribute_value}</td>`;
            break;
          }
          case "file": {
            txt +=  `<td><img style="" src="${base_url}static/images/${item.attribute_value}?w=50&h=50"></td>`;
            break;
          }
          default: {
            txt +=  `<td>${item.attribute_value}</td>`;
          }
        }

        txt += `<td>${item.attribute_value_description}</td>`;
        txt += `</tr> `;
      });

      txt += `</table>`;
      $("#attribute_value_list").html(txt);
      makeDataTable_Basic('attributeValueListTbl');
    } catch (error) {
      $("#attribute_value_list").html(
        `<center><font color=red><b>${error.message}</b></font></center>`
      );
    }
  }
};

$(document).ready(function () {
  getAttributeList();
});
