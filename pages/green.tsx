import React, { useState, useEffect } from 'react';
interface Post {
    date: string;
    title: string;
    platform: string;
}

const posts: Post[] = [
    { date: '2024-09-11', title: 'LinkedIn Post 1', platform: 'LinkedIn' },
    { date: '2024-09-11', title: 'Instagram Post 2', platform: 'Instagram' },
    { date: '2024-09-11', title: 'Instagram Post 3', platform: 'Twitter' },
    { date: '2024-09-11', title: 'LinkedIn Post 1', platform: 'LinkedIn' },
    { date: '2024-09-11', title: 'Instagram Post 2', platform: 'Reddit' },
    { date: '2024-09-11', title: 'Instagram Post 3', platform: 'Pinterest' },
    { date: '2024-09-11', title: 'LinkedIn Post 1', platform: 'LinkedIn' },
    { date: '2024-09-11', title: 'Instagram Post 2', platform: 'Instagram' },
    { date: '2024-09-11', title: 'Instagram Post 3', platform: 'Twitter' },
    { date: '2024-09-11', title: 'LinkedIn Post 1', platform: 'LinkedIn' },
    { date: '2024-09-11', title: 'Instagram Post 2', platform: 'Instagram' },
    { date: '2024-09-11', title: 'Instagram Post 3', platform: 'Twitter' },
    { date: '2024-09-11', title: 'LinkedIn Post 1', platform: 'LinkedIn' },
    { date: '2024-09-11', title: 'Instagram Post 2', platform: 'Instagram' },
    { date: '2024-09-11', title: 'Instagram Post 3', platform: 'Twitter' }
];

const App: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isYearView, setIsYearView] = useState(false);
    const [monthsToShow, setMonthsToShow] = useState(1);
    const [isWeekView, setIsWeekView] = useState(false); // New state for week view
    const [popupContent, setPopupContent] = useState<Post[]>([]);
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        renderCalendar();
    }, [selectedDate, isYearView, monthsToShow, isWeekView]);

    const [isTodayView, setIsTodayView] = useState(false);


    const renderCalendar = () => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
    
        let startDate: Date;
        let endDate: Date;
    
        if (isWeekView) {
            startDate = new Date(selectedDate);
            startDate.setDate(startDate.getDate() - startDate.getDay()); // Start of the week
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6); // End of the week
        } else if (isTodayView) {
            // "Today" view: Show a 30-day grid centered around today's date
            const today = new Date();
            const startOffset = -Math.floor(30 / 2);
            startDate = new Date(today);
            startDate.setDate(today.getDate() + startOffset);
            endDate = new Date(today);
            endDate.setDate(today.getDate() + 30 + startOffset - 1);
        } else {
            startDate = new Date(year, month, 1);
            endDate = new Date(year, month + monthsToShow, 0); // Last day of the selected month(s)
        }
    
        const formatDate = (date: Date) => {
            const day = date.getDate();
            const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
            const year = date.getFullYear();
            return `${day} ${monthName} ${year}`;
        };
    
        const startFormatted = formatDate(startDate);
        const endFormatted = formatDate(endDate);
    
        const monthYearDisplay = document.getElementById('monthYearDisplay') as HTMLSpanElement;
        monthYearDisplay.innerHTML = 
            `<span style="margin-right: 20px;">${startFormatted} - ${endFormatted}</span>`;
    
        const calendarGrid = document.getElementById('calendarGrid') as HTMLDivElement;
        const yearGrid = document.getElementById('yearGrid') as HTMLDivElement;
        const daysHeader = document.getElementById('daysHeader') as HTMLDivElement;
    
        calendarGrid.innerHTML = '';
        yearGrid.innerHTML = '';
        daysHeader.style.display = isYearView ? 'none' : 'grid';
        calendarGrid.style.display = isYearView ? 'none' : 'grid';
        yearGrid.style.display = isYearView ? 'grid' : 'none';
    
        if (isYearView) {
            renderYearView(year);
        } else if (isWeekView) {
            renderWeekView();
        } else if (isTodayView) {
            renderTodayView(startDate, endDate);
        } else {
            renderMultiMonthView(year, month);
        }
    };
    
    const renderTodayView = (startDate: Date, endDate: Date) => {
        const calendarGrid = document.getElementById('calendarGrid') as HTMLDivElement;
        calendarGrid.innerHTML = '';
    
        const today = new Date();
        const daysInRange: Date[] = [];
        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            daysInRange.push(new Date(date));
        }
    
        daysInRange.forEach(date => {
            const dateCell = createDateCell(date, false);
            if (date.toDateString() === today.toDateString()) {
                dateCell.style.backgroundColor = 'white'; // Highlight today
            } else {
                dateCell.style.backgroundColor = 'lightgreen'; // Other days
            }
            calendarGrid.appendChild(dateCell);
        });
    };
    


    const renderMultiMonthView = (year: number, startMonth: number) => {
        const firstDayOfFirstMonth = new Date(year, startMonth, 1);
        const firstDayIndex = firstDayOfFirstMonth.getDay();
        const totalDays: Date[] = [];

        for (let month = startMonth; month < startMonth + monthsToShow; month++) {
            const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
            for (let day = 1; day <= lastDayOfMonth; day++) {
                totalDays.push(new Date(year, month, day));
            }
        }

        const rows = Math.ceil((firstDayIndex + totalDays.length) / 7) * 7;
        const calendarGrid = document.getElementById('calendarGrid') as HTMLDivElement;

        // Add previous month's dates
        const prevMonthDaysToShow = firstDayIndex;
        const prevMonth = startMonth === 0 ? 11 : startMonth - 1;
        const prevMonthYear = startMonth === 0 ? year - 1 : year;
        const prevMonthLastDay = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
        for (let i = prevMonthLastDay - prevMonthDaysToShow + 1; i <= prevMonthLastDay; i++) {
            const date = new Date(prevMonthYear, prevMonth, i);
            const dateCell = createDateCell(date, true);
            calendarGrid.appendChild(dateCell);
        }

        for (let i = 0; i < totalDays.length; i++) {
            const date = totalDays[i];
            const dateCell = createDateCell(date, false);
            calendarGrid.appendChild(dateCell);
        }

        // Add next month's dates
        const nextMonthDaysToShow = rows - (firstDayIndex + totalDays.length);
        const nextMonth = startMonth + monthsToShow === 12 ? 0 : startMonth + monthsToShow;
        const nextMonthYear = startMonth + monthsToShow === 12 ? year + 1 : year;
        for (let i = 1; i <= nextMonthDaysToShow; i++) {
            const date = new Date(nextMonthYear, nextMonth, i);
            const dateCell = createDateCell(date, true);
            calendarGrid.appendChild(dateCell);
        }
    };

    const renderWeekView = () => {
        const calendarGrid = document.getElementById('calendarGrid') as HTMLDivElement;
        calendarGrid.innerHTML = ''; // Clear previous content
    
        const today = new Date();
        const startDate = new Date(selectedDate);
        
        // Calculate the start of the week for the selected date
        const weekStartDate = new Date(startDate);
        weekStartDate.setDate(startDate.getDate() - startDate.getDay()); // Sunday as the start of the week
    
        // Calculate the end of the week (Saturday)
        const weekEndDate = new Date(weekStartDate);
        weekEndDate.setDate(weekStartDate.getDate() + 6);
    
        // Generate the calendar grid for the week
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStartDate);
            date.setDate(weekStartDate.getDate() + i);
            const dateCell = createDateCell(date, false);
            
            // Highlight the current week range
            if (date >= weekStartDate && date <= weekEndDate) {
                dateCell.style.backgroundColor = 'white'; // Highlight current week
            } else {
                dateCell.style.backgroundColor = 'rgb(211, 207, 207)'; // Other days
            }
    
            calendarGrid.appendChild(dateCell);
        }
    };
    
    
    

    const renderYearView = (year: number) => {
        const yearGrid = document.getElementById('yearGrid') as HTMLDivElement;

        for (let month = 0; month < 12; month++) {
            const monthCard = document.createElement('div');
            monthCard.classList.add('month-card');
            monthCard.innerHTML = `<h3>${new Date(year, month).toLocaleString('default', { month: 'long' })}</h3>`;

            const daysHeaderClone = document.getElementById('daysHeader')?.cloneNode(true) as HTMLDivElement;
            monthCard.appendChild(daysHeaderClone);

            const calendarGridClone = document.createElement('div');
            calendarGridClone.classList.add('calendar-grid');
            monthCard.appendChild(calendarGridClone);

            const firstDayOfMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(year, month + 1, 0);
            const firstDayIndex = firstDayOfMonth.getDay();
            const lastDayIndex = lastDayOfMonth.getDate();

            for (let i = 0; i < firstDayIndex; i++) {
                const emptyCell = document.createElement('div');
                calendarGridClone.appendChild(emptyCell);
            }

            for (let day = 1; day <= lastDayIndex; day++) {
                const date = new Date(year, month, day);
                const dateCell = createDateCell(date, false);
                calendarGridClone.appendChild(dateCell);
            }

            yearGrid.appendChild(monthCard);
        }
    };

    const createDateCell = (date: Date, isAdjacentMonth: boolean): HTMLDivElement => {
        const dateCell = document.createElement('div');
        dateCell.style.border = '1px solid #ccc';
        
        // Apply border-radius conditionally
        if (monthsToShow >= 1 && monthsToShow <= 11) {
            dateCell.style.borderRadius = '14px'; // Add border-radius
        } else {
            dateCell.style.borderRadius = '0'; // Ensure no border-radius for year view
        }
        
        const day = date.getDate();
        const monthName = date.toLocaleString('default', { month: 'short' });
        dateCell.innerHTML = `<span class="date ${isAdjacentMonth ? 'adjacent-month' : ''}">${day}</span>`;
        
        if (day === 1 && !isYearView && !isAdjacentMonth) {
            const monthLabel = document.createElement('span');
            monthLabel.classList.add('month-name');
            monthLabel.textContent = monthName;
            dateCell.appendChild(monthLabel);
        }
        
        const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const datePosts = posts.filter(p => p.date === dateStr);
        
        if (monthsToShow === 1) {
            const platforms = datePosts.map(post => post.platform);
    
            if (platforms.length > 0) {
                const platformNames = document.createElement('div');
                platformNames.classList.add('platform-names', 'scrollable');
    
                platforms.forEach(platform => {
                    const platformName = document.createElement('div');
                    platformName.classList.add('platform-item');
    
                    const iconImg = document.createElement('img');
                    iconImg.src = getPlatformIcon(platform);
                    iconImg.alt = platform;
    
                    const platformText = document.createElement('span');
                    platformText.textContent = platform;
    
                    platformName.appendChild(iconImg);
                    platformName.appendChild(platformText);
                    platformNames.appendChild(platformName);
                });
    
                dateCell.appendChild(platformNames);
            }
        } else if (monthsToShow >= 2 && monthsToShow <= 11) {
            if (datePosts.length > 0) {
                const scheduledPostsDiv = document.createElement('div');
                scheduledPostsDiv.classList.add('scheduled-posts');
    
                const iconImg = document.createElement('img');
                iconImg.src = 'https://icones.pro/wp-content/uploads/2021/06/icone-d-image-orange.png'; // Placeholder icon
                iconImg.alt = 'Icon';
    
                const scheduledText = document.createElement('div');
                scheduledText.classList.add('platform-names');
                scheduledText.textContent = '+9 Posts';
    
                scheduledPostsDiv.appendChild(iconImg);
                scheduledPostsDiv.appendChild(scheduledText);
                dateCell.appendChild(scheduledPostsDiv);
            }
        } else if (monthsToShow === 12 && datePosts.length > 0) {
            const redDot = document.createElement('div');
            redDot.classList.add('red-dot');
            dateCell.appendChild(redDot);
        }
        
        dateCell.onclick = () => openPopup(dateStr);
        
        // Add share button for months 1 to 11
        if (monthsToShow >= 1 && monthsToShow <= 11) {
            const shareButton = document.createElement('button');
            shareButton.classList.add('share-button');
            shareButton.innerHTML = `<img src="https://png.pngtree.com/png-vector/20230925/ourmid/pngtree-arrow-icon-green-isolated-on-white-background-exit-png-image_10037389.png" alt="Share" />`;
            shareButton.onclick = (e) => {
                e.stopPropagation(); // Prevent the click event from propagating to the dateCell
                window.open('https://www.google.com', '_blank');
            };
            dateCell.appendChild(shareButton);
        }
        
        return dateCell;
    };
    
    
    
    const getPlatformIcon = (platform: string): string => {
        switch (platform) {
            case 'LinkedIn':
                return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/240px-LinkedIn_logo_initials.png'; 
            case 'Instagram':
                return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwH--J-ZMUg8puNfUxE6YXQi3yVHuAORDxow&s'; 
            case 'Twitter':
                return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwjr0ta4KV6dCZNPlrGLvt5S6YV52T-DPV2w&s';
           case 'Pinterest':
                return 'https://static-00.iconduck.com/assets.00/pinterest-icon-512x512-3vn0ggs9.png'; 
            case 'Reddit':
                return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCEkgMk9iWISgMf-6Czvuppmb7vzN6ExjwJp0hdky7ZyvgPZptMf3iqN879TCDaxBPHA&usqp=CAU'; 
    
                default:
                return 'https://example.com/default-icon.png'; 
        }
    };
    
    

    const openPopup = (dateStr: string) => {
        setPopupVisible(true);
        setPopupContent(posts.filter(p => p.date === dateStr));
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    const navigateToPostDetails = (post: Post) => {
        alert(`Navigating to details for post: ${post.title}`);
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <div>
                    <span id="monthYearDisplay">June 2024</span>
                </div>
                <div>
                <button id="prevBtn" onClick={() => {
    if (isYearView) {
        setSelectedDate(new Date(selectedDate.getFullYear() - 1, selectedDate.getMonth(), 1));
    } else if (isWeekView) {
        // Navigate back by one week
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 7);
        setSelectedDate(newDate);
    } else {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - monthsToShow, 1));
    }
    renderCalendar();
}}>Back</button>
                    <div>
                    <select id="monthViewSelect" className="active" onChange={(e) => {
    const value = parseInt(e.target.value);
    if (value === 0) {
        setIsWeekView(true);
        setIsTodayView(false);
        setMonthsToShow(1);
    } else if (value === -1) {
        setIsTodayView(true);
        setIsWeekView(false);
        setMonthsToShow(1);
    } else {
        setIsWeekView(false);
        setIsTodayView(false);
        setMonthsToShow(value);
    }
    setIsYearView(value === 12);
}}>
    <option value="-1">Today</option>
    <option value="0">Week</option>
    <option value="1">1 Month</option>
    <option value="2">2 Months</option>
    <option value="3">3 Months</option>
    <option value="4">4 Months</option>
    <option value="5">5 Months</option>
    <option value="6">6 Months</option>
    <option value="7">7 Months</option>
    <option value="8">8 Months</option>
    <option value="9">9 Months</option>
    <option value="10">10 Months</option>
    <option value="11">11 Months</option>
    <option value="12">1 Year</option>
</select>

                    </div>
                    <button id="nextBtn" onClick={() => {
    if (isYearView) {
        setSelectedDate(new Date(selectedDate.getFullYear() + 1, selectedDate.getMonth(), 1));
    } else if (isWeekView) {
        // Navigate forward by one week
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 7);
        setSelectedDate(newDate);
    } else {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + monthsToShow, 1));
    }
    renderCalendar();
}}>Next</button>
                </div>
            </div>
            <div className="days-header" id="daysHeader">
                <div>Sunday</div>
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>
            </div>
            <div className="calendar-grid" id="calendarGrid">
                {/* Calendar dates will be injected here */}
            </div>
            <div className="year-grid" id="yearGrid">
                {/* Yearly view months will be injected here */}
            </div>
            <div className={`popup ${popupVisible ? 'visible' : ''}`} id="popup">
                <div className="popup-header">
                    <h3>Posts</h3>
                    <button className="close-btn" onClick={closePopup}>×</button>
                </div>
                <div id="popupContent">
                    {popupContent.map(post => (
                        <div key={post.date + post.title} className="post" onClick={() => navigateToPostDetails(post)}>
                            {post.title} ({post.platform})
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;