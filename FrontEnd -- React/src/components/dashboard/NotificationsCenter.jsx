import React, { useState } from 'react';
import { Bell, Plane, Clock, AlertTriangle, CheckCircle, X, Settings, Filter } from 'lucide-react';

const NotificationsCenter = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'check-in',
      title: 'Check-in Available',
      message: 'Check-in is now open for flight EF 1234 to London (LHR)',
      time: '2 hours ago',
      read: false,
      icon: Plane,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'delay',
      title: 'Flight Delayed',
      message: 'Your flight EF 5678 to Tokyo has been delayed by 45 minutes',
      time: '4 hours ago',
      read: false,
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 3,
      type: 'gate-change',
      title: 'Gate Change',
      message: 'Gate changed for flight EF 9012 from B7 to C15',
      time: '6 hours ago',
      read: true,
      icon: AlertTriangle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      id: 4,
      type: 'boarding',
      title: 'Boarding Started',
      message: 'Boarding has started for flight EF 3456 at gate A12',
      time: '1 day ago',
      read: true,
      icon: Plane,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 5,
      type: 'confirmation',
      title: 'Booking Confirmed',
      message: 'Your booking for flight EF 7890 to Paris has been confirmed',
      time: '2 days ago',
      read: true,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 6,
      type: 'reminder',
      title: 'Travel Reminder',
      message: 'Don\'t forget to check your passport validity for upcoming international flights',
      time: '3 days ago',
      read: true,
      icon: AlertTriangle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    }
  ]);

  const filterOptions = [
    { value: 'all', label: 'All Notifications' },
    { value: 'unread', label: 'Unread' },
    { value: 'check-in', label: 'Check-in' },
    { value: 'delay', label: 'Delays' },
    { value: 'gate-change', label: 'Gate Changes' },
    { value: 'boarding', label: 'Boarding' }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });


  const markAsRead = (id) => {
    console.log('we make the notification ', id, 'readed');

    setNotifications(prev =>
      prev.map(notification => notification.id === id ? { ...notification, read: true } : notification)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Bell className="h-4 w-4 text-gray-700" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </div>
            <h3 className="text-base font-semibold text-gray-900">Notifications</h3>
          </div>

          <div className="flex items-center space-x-1">
            {unreadNotificationsCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-blue-600 hover:text-blue-700 text-xs font-medium"
              >
                Mark all as read
              </button>
            )}
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-1">
          <Filter className="h-3 w-3 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-0.5 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-3 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                >
                  <div className="flex items-start space-x-2">
                    <div className={`p-1 rounded-lg ${notification.bgColor}`}>
                      <Icon className={`h-3 w-3 ${notification.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-xs font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                            {notification.title}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-2">
                            {notification.time}
                          </p>
                        </div>

                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-600 hover:text-blue-700 text-[10px] font-medium"
                            >
                              Mark as read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 text-center">
            <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <h4 className="text-base font-medium text-gray-900 mb-1">No notifications</h4>
            <p className="text-xs text-gray-500">
              {filter === 'unread'
                ? "You're all caught up! No unread notifications."
                : "No notifications match your current filter."
              }
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {filteredNotifications.length > 0 && (
        <div className="p-2 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">
              {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
              {filter !== 'all' && ` (${filter})`}
            </span>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-xs">
              View notification settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsCenter;

