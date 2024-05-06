// Function to fetch all cabins
export async function getMedicine() {
  try {
    const response = await fetch("http://localhost:8080/medicine");
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getMedicineById(id) {
  const response = await fetch(`http://localhost:8080/medicine/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function deleteMedicine(id) {
  const res = await fetch(`http://localhost:8080/medicine/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Cabin could not be deleted:`);
  }
  const data = await res.json();
  console.log(data);
  return data;
}

export async function addMedicine(formData) {
  try {
    const response = await fetch("http://localhost:8080/medicine", {
      method: "POST",
      body: formData, // Send FormData directly
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error.message);
      alert("A medicine with this name already exists");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateMedicine(formData, id) {
  console.log("Updating Medicine", formData);
  try {
    const response = await fetch(`http://localhost:8080/medicine/${id}`, {
      method: "PATCH",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Medicine could not be Upadted: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateStar(formData, id) {
  console.log("Updating Medicine", formData);
  try {
    const response = await fetch(`http://localhost:8080/medicine/star/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Medicine could not be Upadted: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function searchMedicine(searchData) {
  try {
    const response = await fetch("http://localhost:8080/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchData), // Send FormData directly
    });

    if (!response.ok) {
      alert("Cannot do search because response is not ok");
      throw new Error(`Search cannot happen: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("The data Returned from api:", data);
    return data;
  } catch (error) {
    alert("Search happen Cannot be done because server side error");
  }
}

export async function searchByCategory(searchData) {
  try {
    const response = await fetch("http://localhost:8080/search/cat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchData), // Send FormData directly
    });

    if (!response.ok) {
      alert("Cannot do search because response is not ok");
      throw new Error(`Search cannot happen: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("The data Returned from api:", data);
    return data;
  } catch (error) {
    alert("Search happen Cannot be done because server side error");
  }
}
export async function searchByStock(searchData) {
  try {
    const response = await fetch("http://localhost:8080/search/sto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchData), // Send FormData directly
    });

    if (!response.ok) {
      alert("Cannot do search because response is not ok");
      throw new Error(`Search cannot happen: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("The data Returned from api:", data);
    return data;
  } catch (error) {
    alert("Search happen Cannot be done because server side error");
  }
}
