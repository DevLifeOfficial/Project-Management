import React, { useMemo } from "react";

import StatsCard from "../components/ui/StatsCard";
import Table from "../components/ui/Table";
import { ListTodo, Loader, Eye, CheckCircle } from "lucide-react";
import { useProject } from "../context/ProjectContext";
import KpiAreaCard from "../components/ui/KpiAreaCard";
import DonutChart from "../components/ui/DonutChart";

export default function DashBoard() {
  const { project } = useProject();

  const {
    totalProjects,
    totalTasks,
    doneTasks,
    overdueTasks,
    statusCounts,
    recentTasks,
    projectSparkline,
    taskSparkline,
  } = useMemo(() => {
    const now = new Date();

    let totalProjects = project?.length || 0;
    let totalTasks = 0;
    let doneTasks = 0;
    let overdueTasks = 0;

    const statusCounts = {
      todo: 0,
      "In-progress": 0,
      "In-review": 0,
      done: 0,
    };

    const allTasks = [];

    (project || []).forEach((proj) => {
      (proj.tasks || []).forEach((task) => {
        
        totalTasks += 1;

        if (task.status === "done" || task.status === "Done") {
          doneTasks += 1;
        }

        const key =
          task.status === "ToDo" || task.status === "todo"
            ? "todo"
            : task.status;

        if (statusCounts[key] !== undefined) {
          statusCounts[key] += 1;
        }

        if (
          task.endDate &&
          new Date(task.endDate) < now &&
          task.status !== "done" &&
          task.status !== "Done"
        ) {
          overdueTasks += 1;
        }

        allTasks.push({
          ...task,
          projectName: proj.name || proj.title || "Untitled Project",
        });
      });
    });

    const projectSparkline = project.map((proj, index) => ({
      value: index + 1,
    }));

    const taskSparkline = project.map((proj) => ({
      value: proj.tasks?.length || 0,
    }));

    allTasks.sort((a, b) => {
      const aEnd = a.endDate ? new Date(a.endDate).getTime() : 0;
      const bEnd = b.endDate ? new Date(b.endDate).getTime() : 0;
      return bEnd - aEnd;
    });

    const recentTasks = allTasks.slice(0, 6);

    return {
      totalProjects,
      totalTasks,
      doneTasks,
      overdueTasks,
      statusCounts,
      recentTasks,
      projectSparkline,
      taskSparkline,
    };
  }, [project]);

  const completionRate =
    totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const recentTaskColumns = [
    { header: "Task", accessor: "task" },
    { header: "Project", accessor: "projectName" },
    { header: "Assigned To", accessor: "assignedTo" },
    { header: "Status", accessor: "status" },
    { header: "End Date", accessor: "endDate" },
  ];

  const projectData = [
    {
      title: "Total Projects",
      value: totalProjects,
      percent: completionRate,
      percentColor: "text-green-600",
      stroke: "#22c55e",
      gradientId: "projectGradient",
      bg: "bg-[#E6F4EA]",
      chartData: projectSparkline,
    },
    {
      title: "Total Tasks",
      value: totalTasks,
      percent: completionRate,
      percentColor: "text-orange-600",
      stroke: "#f97316",
      gradientId: "taskGradient",
      bg: "bg-[#FFF2E7]",
      chartData: taskSparkline,
    },
  ];

  const donutData = Object.entries(statusCounts).map(([status, value]) => ({
    name: status,
    value,
  }));

  return (
    <div className="w-full max-w-7xl mx-auto h-full py-6 sm:py-8 md:py-10 px-0.5 sm:px-5 md:px-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Project Overview
          </h1>
          <p className="text-sm text-gray-800 font-medium mt-1">
            Track all projects, tasks, and progress at a glance.
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard
          title="Total Projects"
          value={totalProjects}
          subtitle="Active projects"
          icon={ListTodo}
          color="bg-blue-500"
        />
        <StatsCard
          title="Total Tasks"
          value={totalTasks}
          subtitle="All tasks"
          icon={Loader}
          color="bg-yellow-500"
        />
        <StatsCard
          title="Completed"
          value={`${doneTasks} (${completionRate}%)`}
          subtitle="Tasks marked as Done"
          icon={CheckCircle}
          color="bg-green-500"
        />
        <StatsCard
          title="Overdue"
          value={overdueTasks}
          subtitle="Past end date"
          icon={Eye}
          color="bg-red-500"
        />
      </div>

      {/* Chart + summary grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Tasks by Status
            </h2>
            <span className="text-xs text-gray-400">Across all projects</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projectData.map((item, index) => (
              <KpiAreaCard
                key={index}
                title={item.title}
                value={item.value}
                percent={item.percent}
                percentColor={item.percentColor}
                data={item.chartData}
                stroke={item.stroke}
                gradientId={item.gradientId}
                bg={item.bg}
              />
            ))}
          </div>
        </div>

        <DonutChart data={donutData} />
      </div>

      {/* Recent tasks table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Recent Tasks
          </h2>
          <span className="text-xs text-gray-400">
            Latest updated by end date
          </span>
        </div>
        <Table
          columns={recentTaskColumns}
          data={recentTasks}
          onRowClick={null}
          error={null}
        />
      </div>
    </div>
  );
}
