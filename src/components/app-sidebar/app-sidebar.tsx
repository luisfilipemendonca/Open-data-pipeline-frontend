import { Link } from '@tanstack/react-router';
import { Text } from '../text';

export const AppSidebar = () => {
  return (
    <div className="h-screen w-54 p-2">
      <div className="h-full bg-slate-200 rounded-sm p-2 flex flex-col gap-8">
        <Text>Open Data Pipeline</Text>
        <ul className="flex flex-col gap-1">
          <li>
            <Link
              to="/imports"
              activeProps={{ className: 'bg-slate-300' }}
              className="w-full flex p-2 rounded-sm"
            >
              Imports
            </Link>
          </li>
          <li>
            <Link
              to="/imports"
              activeProps={{ className: 'bg-slate-300' }}
              className="w-full flex p-2 rounded-sm"
            >
              Schemas
            </Link>
          </li>
          <li>
            <Link
              to="/imports"
              activeProps={{ className: 'bg-slate-300' }}
              className="w-full flex p-2 rounded-sm"
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
