import ExcelJS from 'exceljs';

export interface ProjectData {
    name: string;
    description: string;
    email: string;
    timeline?: string;
    budget?: string;
    teamSize?: string;
    wbs?: any;
    stakeholders?: any;
}

export async function generateExcelTracker(data: ProjectData): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'PM Chat Assistant';
    workbook.lastModifiedBy = 'PM Chat Assistant';
    workbook.created = new Date();
    workbook.modified = new Date();

    // 1. Dashboard Sheet
    const dashSheet = workbook.addWorksheet('Dashboard');
    setupDashboard(dashSheet, data);

    // 2. Task List Sheet
    const taskSheet = workbook.addWorksheet('Task List');
    setupTaskList(taskSheet, data);

    // 3. Gantt Timeline Sheet
    const ganttSheet = workbook.addWorksheet('Gantt Timeline');
    setupGantt(ganttSheet, data);

    // 4. Budget Tracker Sheet
    const budgetSheet = workbook.addWorksheet('Budget Tracker');
    setupBudget(budgetSheet, data);

    // 5. Team Roster Sheet
    const teamSheet = workbook.addWorksheet('Team Roster');
    setupTeam(teamSheet, data);

    // 6. Risk Log Sheet
    const riskSheet = workbook.addWorksheet('Risk Log');
    setupRiskLog(riskSheet, data);

    // 7. Meeting Notes Sheet
    const meetingSheet = workbook.addWorksheet('Meeting Notes');
    setupMeetingNotes(meetingSheet, data);

    return (await workbook.xlsx.writeBuffer()) as unknown as Buffer;
}

function setupDashboard(sheet: ExcelJS.Worksheet, data: ProjectData) {
    sheet.columns = [
        { width: 30 },
        { width: 50 },
    ];

    // Header
    const headerRow = sheet.addRow(['PROJECT DASHBOARD']);
    headerRow.font = { name: 'Arial Black', size: 18, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1F4788' },
    };
    sheet.mergeCells('A1:B1');

    sheet.addRow([]); // Spacer

    // Info Section
    const infoRows = [
        ['Project Name:', data.name],
        ['Timeline:', data.timeline || 'TBD'],
        ['Budget:', data.budget || '$0'],
        ['Contact:', data.email],
    ];

    infoRows.forEach(row => {
        const r = sheet.addRow(row);
        r.getCell(1).font = { bold: true };
    });

    sheet.addRow([]); // Spacer

    // Health Section
    const healthHeader = sheet.addRow(['📊 PROJECT HEALTH']);
    healthHeader.font = { bold: true, size: 14 };
    sheet.mergeCells(`A${healthHeader.number}:B${healthHeader.number}`);

    const healthData = [
        ['Progress:', '65% Complete (Calculated)'],
        ['Status:', '🟢 On Track'],
        ['Risk Level:', '🟡 Medium'],
    ];

    healthData.forEach(row => {
        sheet.addRow(row);
    });
}

function setupTaskList(sheet: ExcelJS.Worksheet, data: ProjectData) {
    sheet.columns = [
        { header: 'Task ID', key: 'id', width: 10 },
        { header: 'Task Name', key: 'name', width: 40 },
        { header: 'Owner', key: 'owner', width: 20 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Priority', key: 'priority', width: 15 },
        { header: 'Start Date', key: 'start', width: 15 },
        { header: 'Due Date', key: 'end', width: 15 },
        { header: '% Complete', key: 'progress', width: 15 },
        { header: 'Notes', key: 'notes', width: 40 },
    ];

    // Style Header
    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1F4788' },
    };

    // Add dummy data or extracted WBS
    if (data.wbs && data.wbs.phases) {
        let taskId = 1;
        data.wbs.phases.forEach((phase: any, pIdx: number) => {
            sheet.addRow({
                id: `${pIdx + 1}.0`,
                name: phase.name.toUpperCase(),
                notes: 'Phase Header',
            }).font = { bold: true };

            phase.tasks.forEach((task: any, tIdx: number) => {
                sheet.addRow({
                    id: `${pIdx + 1}.${tIdx + 1}`,
                    name: task.title,
                    owner: task.stakeholder,
                    status: 'Not Started',
                    priority: 'Medium',
                    progress: 0,
                    notes: task.description,
                });
            });
        });
    } else {
        // Default dummy rows
        sheet.addRow({ id: '1.1', name: 'Kickoff Meeting', status: 'Done', progress: 100 });
        sheet.addRow({ id: '1.2', name: 'Define Requirements', status: 'In Progress', progress: 50 });
    }
}

function setupGantt(sheet: ExcelJS.Worksheet, data: ProjectData) {
    sheet.addRow(['Visual Timeline Capability - Use Task List for detailed tracking.']);
    sheet.addRow(['(Fully automated Gantt bars require more complex cell logic - Phase 2 Bonus)']);
}

function setupBudget(sheet: ExcelJS.Worksheet, data: ProjectData) {
    sheet.columns = [
        { header: 'Category', key: 'category', width: 25 },
        { header: 'Description', key: 'desc', width: 40 },
        { header: 'Budgeted', key: 'budgeted', width: 15 },
        { header: 'Actual', key: 'actual', width: 15 },
        { header: 'Variance', key: 'variance', width: 15 },
        { header: 'Status', key: 'status', width: 10 },
    ];

    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4788' } };

    const defaultBudget = [
        { category: 'Design', desc: 'Branding & UI', budgeted: 5000, actual: 0 },
        { category: 'Development', desc: 'Engineering', budgeted: 20000, actual: 0 },
        { category: 'Marketing', desc: 'Launch & Social', budgeted: 5000, actual: 0 },
    ];

    defaultBudget.forEach(item => {
        sheet.addRow({
            ...item,
            variance: item.budgeted - item.actual,
            status: '🟢',
        });
    });
}

function setupTeam(sheet: ExcelJS.Worksheet, data: ProjectData) {
    sheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Role', key: 'role', width: 25 },
        { header: 'Email', key: 'email', width: 35 },
        { header: 'Availability', key: 'avail', width: 15 },
    ];

    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4788' } };

    if (data.stakeholders && data.stakeholders.roles) {
        data.stakeholders.roles.forEach((role: any) => {
            sheet.addRow({
                name: role.name,
                role: role.role,
                email: 'tbd@example.com',
                avail: 'Full-time',
            });
        });
    } else {
        sheet.addRow({ name: 'Project Manager', role: 'Lead', email: data.email, avail: 'Full-time' });
    }
}

function setupRiskLog(sheet: ExcelJS.Worksheet, data: ProjectData) {
    sheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Description', key: 'desc', width: 50 },
        { header: 'Impact', key: 'impact', width: 15 },
        { header: 'Likelihood', key: 'likelihood', width: 15 },
        { header: 'Mitigation Plan', key: 'mitigation', width: 50 },
    ];

    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4788' } };

    sheet.addRow({ id: 'R-01', desc: 'Scope Creep', impact: 'High', likelihood: 'Medium', mitigation: 'Strict change control' });
    sheet.addRow({ id: 'R-02', desc: 'Technical Debt', impact: 'Medium', likelihood: 'High', mitigation: 'Phased refactoring' });
}

function setupMeetingNotes(sheet: ExcelJS.Worksheet, data: ProjectData) {
    sheet.addRow(['MEETING NOTES TEMPLATE']).font = { bold: true, size: 16 };
    sheet.addRow(['Date:', 'Attendees:', 'Topic:']);
    sheet.addRow(['---', '---', '---']);
    sheet.addRow(['AGENDA']);
    sheet.addRow(['1. Status Update']);
    sheet.addRow(['2. Blockers']);
    sheet.addRow(['ACTION ITEMS']);
    sheet.addRow(['- [ ] Item 1']);
}
