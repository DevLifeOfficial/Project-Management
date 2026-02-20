import React, { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import StatsCard from "../components/ui/StatsCard";
import {
  CheckCircle,
  Eye,
  Filter,
  ListTodo,
  Loader,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import FilterComponent from "../components/ui/FilterComponent";
import Modal from "../components/ui/Modal";
import Form from "../components/ui/Form";
import Table from "../components/ui/Table";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import Confirm from "../components/ui/Confirm";

export default function ProjectDetails() {
  const [activeControl, setActiveControl] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();
  const { project, addTask, updateTask, selectedProjectId, setSelectedProjectId, deleteTask } = useProject();
  const selectedProject = project.find((proj) => proj.id === id);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [formData, setFormData] = useState({
    task: "",
    description: "",
    assignedTo: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredTasks = useMemo(() => {
    if (!selectedProject) return [];
    return selectedProject.tasks.filter((task) => {
      const matchesSearch = task.task
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === "all" || task.status === statusFilter;

      return matchesSearch && matchStatus;
    });
  });

  const TaskFormConfig = [
    {
      name: "task",
      label: "Task",
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
      name: "assignedTo",
      label: "Assigned To",
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
        { value: "todo", label: "ToDo" },
        { value: "In-progress", label: "In Progress" },
        { value: "In-review", label: "In Review" },
        { value: "Done", label: "Done" },
      ],
    },
  ];

  const columns = [
    {
      header: "Task",
      accessor: "task",
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
      header: "Assigned To",
      accessor: "assignedTo",
    },
    {
      header: "End Date",
      accessor: "endDate",
    },
    {
      header: "Status",
      accessor: "status",
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

  const handleConfirmDelete = () =>{
    deleteTask(id, selectedProjectId);
    setIsConfirmOpen(false);
    setSelectedProjectId(null);
  }

  const statsCard = [
    {
      title: "Todo",
      value: selectedProject
        ? selectedProject.tasks.filter((task) => task.status === "todo").length
        : 0,
      subtitle: "Pending tasks",
      icon: ListTodo,
      color: "bg-blue-500",
      trend: "default",
    },
    {
      title: "In Progress",
      value: selectedProject
        ? selectedProject.tasks.filter((task) => task.status === "In-progress")
            .length
        : 0,
      subtitle: "Currently working",
      icon: Loader,
      color: "bg-yellow-500",
      trend: "default",
    },
    {
      title: "In Review",
      value: selectedProject
        ? selectedProject.tasks.filter((task) => task.status === "In-review")
            .length
        : 0,
      subtitle: "Waiting approval",
      icon: Eye,
      color: "bg-purple-500",
      trend: "default",
    },
    {
      title: "Done",
      value: selectedProject
        ? selectedProject.tasks.filter((task) => task.status === "done").length
        : 0,
      subtitle: "Completed tasks",
      icon: CheckCircle,
      color: "bg-green-500",
      trend: "default",
    },
  ];

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
        { value: "todo", label: "ToDo" },
        { value: "In-progress", label: "In Progress" },
        { value: "In-review", label: "In Review" },
        { value: "done", label: "Done" },
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
        setIsEditMode(false);
        setIsFormOpen(true);
      },
    },
  ];

  const handleEdit = (task) => {
    setFormData({
      task: task.task,
      description: task.description,
      assignedTo: task.assignedTo,
      startDate: task.startDate,
      status: task.status,
      endDate: task.endDate,
    });
    setEditTask(task);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    TaskFormConfig.filter(
      (field) =>
        field.mode === "both" ||
        (field.mode && isEditMode === "edit") ||
        (field.mode && !isEditMode === "add"),
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
      // update task logic here
      updateTask(id, { ...editTask, ...formData });
      setIsEditMode(false);
      setEditTask(null);
    } else {
      // add task logic here
      addTask(id, {
        id: uuid(),
        task: formData.task,
        description: formData.description,
        assignedTo: formData.assignedTo,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: "todo",
      });
    }

    resetForm();
    setIsFormOpen(false);
  };

  const resetForm = () => {
    setFormData({
      task: "",
      description: "",
      assignedTo: "",
      startDate: "",
      endDate: "",
    });

    setIsFormOpen(false);
    setIsEditMode(false);
    setEditTask(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto h-full py-6 sm:py-8 md:py-10 px-3 sm:px-5 md:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {statsCard.map((item, index) => (
          <StatsCard key={index} {...item} />
        ))}
      </div>

      <FilterComponent controls={filterOptions} activeControl={activeControl} />

      
      <Table
        columns={columns}
        onRowClick={(id) => navigate(`/task/${id}`)}
        data={filteredTasks}
        error={null} 
      />
    
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        size="max-w-2xl"
      >
        <Form
          fields={TaskFormConfig}
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
