// permission
const tablePermission = document.querySelector("table[table-permission]")
if(tablePermission){

    const buttonSubmit = document.querySelector("button[button-submit]");

    buttonSubmit.addEventListener("click", () => {
        let permission = [];

        const rows = tablePermission.querySelectorAll("tr[data-name]")

        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input")

            if(name == "id"){
                inputs.forEach(input =>{
                    const id = input.value;

                    permission.push({
                        id: id,
                        permission: []
                    })
                })

            } else{
                inputs.forEach((input, index) => {
                    const checked = input.checked;

                    if(checked){
                        permission[index].permission.push(name)
                    }
                    
                })
            }
        })

        console.log(permission)

        if(permission.length > 0){
            const formChangePermission = document.querySelector("#form-change-permission");
            const inputPermission = formChangePermission.querySelector("input[name='permission']");

            inputPermission.value = JSON.stringify(permission);
            formChangePermission.submit();
        }
    })
}
// end permission


// permission data default
const dataRecord = document.querySelector("div[data-record]");
if(dataRecord){
    const record = JSON.parse(dataRecord.getAttribute("data-record"));

    const tablePermission = document.querySelector("table[table-permission]");

    console.log(record)
    
    record.forEach((record, index) => {
        const permission = record.permissions;
        
        permission.forEach(permission => {
            const row = tablePermission.querySelector(`tr[data-name="${permission}"]`);

            const input = row.querySelectorAll("input")[index];

            input.checked = true;
        })
    })
    
}
// end permission data default