import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  fetchMembers,
  deleteMember,
  makeSubAdmin,
} from "../../Redux/slice/member.slice";

const AdminHome = () => {
  const dispatch = useDispatch();
  const { members, loading } = useSelector((state) => state.member);
  const { name } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [confirmBox, setConfirmBox] = useState(null);
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  /* 🔍 SEARCH */
  const searchedMembers = useMemo(() => {
    if (!Array.isArray(members)) return [];
    return members.filter(
      (m) =>
        (m.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (m.phone || "").includes(search) ||
        (m.membershipId || "").toLowerCase().includes(search.toLowerCase()),
    );
  }, [members, search]);

  /* 🎯 ROLE FILTER */
  const filteredMembers = useMemo(() => {
    return searchedMembers.filter((m) => {
      if (roleFilter === "member") return !m.isHead;
      if (roleFilter === "subadmin") return m.isHead;
      return true;
    });
  }, [searchedMembers, roleFilter]);

  /* 🔼 SORT */
  const sortedMembers = useMemo(() => {
    return [...filteredMembers].sort((a, b) =>
      String(a.membershipId || "").localeCompare(String(b.membershipId || "")),
    );
  }, [filteredMembers]);

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "-";

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 flex flex-col">
      {/* HEADER */}
      {name && (
        <div className="mb-4">
          <h3 className="text-lg md:text-xl font-semibold">Welcome {name}</h3>
          <p className="text-gray-500 text-sm md:text-base">
            Manage all registered members
          </p>
        </div>
      )}

      {/* STICKY SEARCH BAR */}
      <div className="sticky top-0 z-30 bg-gray-100 pb-3 pt-2 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search name, phone, ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 bg-white"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="all">All</option>
          <option value="member">Members</option>
          <option value="subadmin">Sub-Admins</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="flex-1 overflow-auto bg-white rounded-lg shadow mt-3">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Photo</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">DOB</th>
              <th className="p-3">Blood</th>
              <th className="p-3">City</th>
              <th className="p-3">Joined</th>
              <th className="p-3">Verified</th>
              <th className="p-3">Role</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="12" className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : sortedMembers.length ? (
              sortedMembers.map((m) => (
                <tr key={m._id} className="border-b hover:bg-orange-50">
                  <td className="p-3 font-semibold">{m.membershipId}</td>

                  <td className="p-3">
                    <img
                      src={m.photoUrl}
                      alt={m.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="p-3">{m.name}</td>
                  <td className="p-3">{m.phone}</td>
                  <td className="p-3">{m.email}</td>
                  <td className="p-3">{formatDate(m.dob)}</td>
                  <td className="p-3">{m.bloodGroup || "-"}</td>
                  <td className="p-3">{m.city}</td>

                  <td className="p-3">{formatDate(m.joinedOn)}</td>

                  <td className="p-3">
                    {m.isVerified ? (
                      <span className="text-green-600 font-bold">Yes</span>
                    ) : (
                      <span className="text-red-500">No</span>
                    )}
                  </td>

                  <td className="p-3 font-semibold">
                    {m.isHead ? "Sub-Admin" : "Member"}
                  </td>

                  <td className="p-3 space-x-2">
                    <button
                      onClick={() =>
                        setConfirmBox({
                          title: "Delete Member",
                          message: `Delete ${m.name}?`,
                          onConfirm: async () => {
                            try {
                              await dispatch(deleteMember(m._id)).unwrap();
                              toast.success("Member deleted");
                            } catch (err) {
                              toast.error(err);
                            }
                            setConfirmBox(null);
                          },
                        })
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>

                    {m.interestedInHead && !m.isHead && (
                      <button
                        onClick={() =>
                          setConfirmBox({
                            title: "Promote Member",
                            message: `Make ${m.name} Sub-Admin?`,
                            onConfirm: async () => {
                              try {
                                await dispatch(makeSubAdmin(m._id)).unwrap();
                                toast.success("Promoted to Sub-Admin");
                                dispatch(fetchMembers());
                              } catch (err) {
                                toast.error(err?.message || err);
                              }
                              setConfirmBox(null);
                            },
                          })
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Make Sub-Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="p-6 text-center text-gray-500">
                  No members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CONFIRM MODAL */}
      {confirmBox && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="font-semibold mb-2">{confirmBox.title}</h3>
            <p className="text-gray-600 mb-4">{confirmBox.message}</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmBox(null)}>Cancel</button>
              <button
                onClick={confirmBox.onConfirm}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
