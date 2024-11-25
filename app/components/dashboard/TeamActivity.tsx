export default function TeamActivity() {
  const activities = [
    { user: 'Sarah K.', action: 'reviewed', target: 'Homepage Design', time: '5m ago' },
    { user: 'Mike R.', action: 'completed', target: 'Logo Animation', time: '2h ago' },
    { user: 'Anna M.', action: 'commented on', target: 'Mobile App', time: '4h ago' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Team Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              {activity.user.charAt(0)}
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>
                {' '}{activity.action}{' '}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 