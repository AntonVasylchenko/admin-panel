export async function createProduct(req,res) {
    try {
        res.send("Create")
    } catch (error) {
        console.log(error);
    }
}
export async function getSinleProduct(req,res) {
    try {
        res.send("Single")
    } catch (error) {
        console.log(error);
    }
}
export async function getAllProducts(req,res) {
    try {
        res.send("All")
    } catch (error) {
        console.log(error);
    }
}
export async function updateProduct(req,res) {
    try {
        res.send("Update")
    } catch (error) {
        console.log(error);
    }
}
export async function deleteProduct(req,res) {
    try {
        res.send("Delete")
    } catch (error) {
        console.log(error);
    }
}