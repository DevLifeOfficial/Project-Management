import React, { useMemo, useState } from "react";
import { useProject } from "../context/ProjectContext";
import { v4 as uuid } from "uuid";
import Form from "../components/ui/Form";
import Modal from "../components/ui/Modal";
import {
  AlertCircle,
  BriefcaseBusiness,
  CheckCircle2,
  Filter,
  FolderGit2,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import StatsCard from "../components/ui/StatsCard";
import Table from "../components/ui/Table";
import Confirm from "../components/ui/Confirm";
import { useNavigate } from "react-router-dom";
import FilterComponent from "../components/ui/FilterComponent";
import StatusBadges from "../components/ui/StatusBadges";

export default function Project() {
  const {
    addProject,
    project,
    updateProject,
    deleteProject,
    setSelectedProjectId,
    selectedProjectId,
  } = useProject();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [error, setError] = useState({});
  const [activeControl, setActiveControl] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const ProjectFormConfig = [
    {
      name: "name",
      label: "Project Name",
      type: "text",
      required: true,
      mode: "both",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: true,
      mode: "both",
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      required: true,
      mode: "add",
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      required: true,
      mode: "both",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      mode: "edit",
      options: [
        { value: "ongoing", label: "Ongoing" },
        { value: "completed", label: "Completed" },
        { value: "overdue", label: "Overdue" },
      ],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredProjects = useMemo(
    () =>
      project.filter((p) => {
        const matchesSearch = p.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "all" || p.status === statusFilter;

        return matchesSearch && matchesStatus;
      }),
    [project, searchTerm, statusFilter],
  );

  const statsConfig = [
    {
      title: "Total Projects",
      value: filteredProjects.length,
      subtitle: "Increase from last month",
      icon: BriefcaseBusiness,
      color: "bg-blue-500",
    },
    {
      title: "Ongoing Projects",
      value: filteredProjects.filter((p) => p.status === "ongoing").length,
      subtitle: "Currently active",
      icon: FolderGit2,
      color: "bg-yellow-500",
    },
    {
      title: "Completed Projects",
      value: filteredProjects.filter((p) => p.status === "completed").length,
      subtitle: "Successfully delivered",
      icon: CheckCircle2,
      color: "bg-green-500",
    },
    {
      title: "Overdue Projects",
      value: filteredProjects.filter((p) => p.status === "overdue").length,
      subtitle: "Needs attention",
      icon: AlertCircle,
      color: "bg-red-500",
    },
  ];

  const handleEdit = (project) => {
    setFormData({
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      status: project.status,
    });
    setEditProject(project);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  const columns = [
    {
      header: "Project Name",
      accessor: "name",
    },
    {
      header: "Description",
      accessor: "description",
    },
    {
      header: "Start Date",
      accessor: "startDate",
    },
    {
      header: "End Date",
      accessor: "endDate",
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => <StatusBadges status={row.status} />,
    },
    {
      header: "Actions",
      accessor: "actions",
      cell: (row) => (
        <div
          className="w-full flex  items-center justify-start  space-x-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="text-blue-500 hover:underline"
            onClick={() => handleEdit(row)}
          >
            <Pencil size={16} />
          </button>
          <button
            className="text-red-500 hover:underline ml-2"
            onClick={() => {
              setSelectedProjectId(row.id);
              setIsConfirmOpen(true);
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  const handleConfirmDelete = () => {
    deleteProject(selectedProjectId);
    setIsConfirmOpen(false);
    setSelectedProjectId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    ProjectFormConfig.filter(
      (field) =>
        field.mode === "both" ||
        (isEditMode && field.mode === "edit") ||
        (!isEditMode && field.mode === "add"),
    ).forEach((field) => {
      if (field.required && !formData[field.name]) {
        errors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      alert("Start date cannot be after End date");
      return;
    }

    if (isEditMode) {
      updateProject({ ...editProject, ...formData });
      setIsEditMode(false);
      setEditProject(null);
    } else {
      addProject({
        id: uuid(),
        ...formData,
        status: "ongoing",
        tasks: [],
      });
    }

    resetForm();
    setError("");
    setIsFormOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    });

    setIsEditMode(false);
    setEditProject(null);
    setIsFormOpen(false);
  };

  const filterOptions = [
    {
      name: "search",
      type: "input",
      showIcon: true,
      icon: Search,
      placeholder: "Search project...",
      onToggle: () => {
        setActiveControl(activeControl === "search" ? null : "search");
      },
      onChange: (e) => {
        setSearchTerm(e.target.value);
      },
      value: searchTerm,
    },
    {
      name: "filter",
      type: "select",
      showIcon: true,
      icon: Filter,
      options: [
        { value: "all", label: "All" },
        { value: "ongoing", label: "Ongoing" },
        { value: "completed", label: "Completed" },
        { value: "overdue", label: "Overdue" },
      ],
      onToggle: () => {
        setActiveControl(activeControl === "filter" ? null : "filter");
      },
      onChange: (e) => {
        setStatusFilter(e.target.value);
      },
      value: statusFilter,
    },
    {
      name: "add",
      type: "button",
      showIcon: true,
      icon: Plus,
      onClick: () => {
        resetForm();
        setIsFormOpen(true);
      },
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto h-full py-6 sm:py-8 md:py-10 px-3 sm:px-5 md:px-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
        {statsConfig.map((item, index) => (
          <StatsCard key={index} {...item} />
        ))}
      </div>

      {/* Filters */}
      <FilterComponent controls={filterOptions} activeControl={activeControl} />

      {/* Table */}
      <Table
        columns={columns}
        onRowClick={(id) => navigate(`/project/${id}`)}
        data={filteredProjects}
        error={null}
      />

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        size="max-w-2xl"
      >
        <Form
          fields={ProjectFormConfig}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isOpen={isFormOpen}
          resetForm={resetForm}
          mode={isEditMode ? "edit" : "add"}
          error={error}
        />
      </Modal>

      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        size="max-w-md"
      >
        <Confirm
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Project"
          message="Are you sure you want to delete this project? This action cannot be undone."
        />
      </Modal>
    </div>
  );
}
