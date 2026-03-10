function ShimmerUserTable() {
  return (
    <div className="card user-card">
      <div className="card-header gradient-header text-white text-center fs-5 fw-bold">
        🌈 Loading Registered Users...
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-borderless align-middle mb-0 text-center">
            <thead className="table-gradient">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td>
                    <div className="shimmer shimmer-sm"></div>
                  </td>
                  <td>
                    <div className="shimmer shimmer-md"></div>
                  </td>
                  <td>
                    <div className="shimmer shimmer-lg"></div>
                  </td>
                  <td>
                    <div className="shimmer shimmer-md"></div>
                  </td>
                  <td>
                    <div className="shimmer shimmer-sm"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function UsersTable({ users, onDelete }) {
  return (
    <div className="card user-card fade-in">
      <div className="card-header gradient-header text-white text-center fs-5 fw-bold glow-header">
        <i class="fa-solid fa-users"></i> Registered Users
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table fancy-table align-middle mb-0 text-center">
            <thead className="table-gradient text-white">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className="slide-in-row row-hover"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <td>{index + 1}</td>
                  <td className="fw-semibold text-dark">{user.name}</td>
                  <td className="text-dark-50">{user.email}</td>
                  <td className="fw-semibold text-danger">{user.username}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger glow-btn fw-bold"
                      onClick={() => onDelete(user.id)}
                    >
                      <i className="fas fa-trash-alt me-1"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ViewUsers() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/admin/all_user_list");
      const data = await res.json();
      if (data.status === "success") {
        setUsers(data.users);
      } else {
        Swal.fire("⚠️ Error", data.message, "error");
      }
    } catch (err) {
      Swal.fire("🚫 Error", "Failed to fetch users!", "error");
    }
    setLoading(false);
  };

  const handleDelete = async (userId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`/admin/delete/${userId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.status === "success") {
          Swal.fire("✅ Deleted!", data.message, "success");
          setUsers(users.filter((u) => u.id !== userId));
        } else {
          Swal.fire("❌ Error", data.message, "error");
        }
      } catch (err) {
        Swal.fire("🚫 Error", "Something went wrong!", "error");
      }
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {loading ? (
        <ShimmerUserTable />
      ) : (
        <UsersTable users={users} onDelete={handleDelete} />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("view-users-root"));
root.render(<ViewUsers />);

// CSS Enhancements
const style = document.createElement("style");
style.innerHTML = `
body {
  
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

.user-card {
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 25px rgba(0,0,0,0.4);
  width: 90%;
  max-width: 900px;
  margin: 40px auto;
  animation: fadeIn 1s ease-in-out;
}

.gradient-header {
  background: linear-gradient(90deg, #00c6ff, #0072ff, #7a00ff);
  padding: 14px;
  text-shadow: 1px 1px 6px rgba(0,0,0,0.5);
}

.glow-header {
  box-shadow: 0 0 15px rgba(0, 21, 255, 0.99);
}

.table-gradient {
  background: linear-gradient(90deg, #3a1c71, #d76d77, #ffaf7b);
}

.fancy-table tbody tr {
  transition: all 0.4s ease;
}

.row-hover:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.02);
  box-shadow: 0 0 10px rgba(255, 38, 0, 1);
}

.glow-btn {
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
  border: none;
  color: #fff;
  transition: all 0.3s ease;
}
.glow-btn:hover {
  box-shadow: 0 0 15px rgba(255, 64, 64, 0.8);
  transform: scale(1.1);
}

/* shimmer effect */
.shimmer {
  background: linear-gradient(100deg, #444 20%, #555 50%, #444 80%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 5px;
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.shimmer-sm { height: 14px; width: 40px; }
.shimmer-md { height: 14px; width: 80px; }
.shimmer-lg { height: 14px; width: 150px; }

/* animations */
.fade-in {
  animation: fadeIn 0.8s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.slide-in-row {
  opacity: 0;
  transform: translateY(10px);
  animation: slideIn 0.5s ease-out forwards;
}
@keyframes slideIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);
