import React from "react";
import {
  Loader2,
  Search,
  Download,
  Star,
  ArrowRight,
  ArrowLeft,
  User,
  Settings,
  SettingsIcon,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  XIcon,
  Trash2,
  Trash2Icon,
  Edit2,
  Edit2Icon,
  Copy,
  Calendar,
  Plus,
  Minus,
  RefreshCw,
  RefreshCwIcon,
  Eye,
  EyeOff,
  Mail,
  LayoutGrid,
  LayoutGridIcon,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Heart,
  Share2,
  Upload,
  Filter,
  Home,
  Shield,
  Key,
  Folder,
  File,
  type LucideProps,
} from "lucide-react";

// Re-export everything from lucide-react so all 1000+ icons are available
export * from "lucide-react";

// Props interface extending LucideProps
export interface AntdIconProps extends LucideProps {
  spin?: boolean;
  rotate?: number;
}

// Global keyframe injection for spinning icons
if (typeof document !== "undefined") {
  const styleId = "ch-lucide-spin-keyframes";
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement("style");
    styleEl.id = styleId;
    styleEl.textContent = `
      @keyframes ch-icon-spin {
        100% {
          transform: rotate(360deg);
        }
      }
      .ch-icon-spin {
        animation: ch-icon-spin 1s infinite linear;
      }
    `;
    document.head.appendChild(styleEl);
  }
}

// Helper wrapper to support `spin` and `rotate` with Lucide icons
function createIconWrapper(
  IconComponent: React.ComponentType<LucideProps>,
  defaultSpin = false
) {
  const WrappedIcon = React.forwardRef<SVGSVGElement, AntdIconProps>(
    ({ spin = defaultSpin, rotate, className = "", style, ...rest }, ref) => {
      const combinedStyle: React.CSSProperties = {
        ...style,
        ...(rotate ? { transform: `rotate(${rotate}deg)` } : {}),
        ...(spin ? { animation: "ch-icon-spin 1s infinite linear" } : {}),
      };

      return React.createElement(IconComponent as any, {
        ref,
        className: [spin ? "ch-icon-spin" : "", className].filter(Boolean).join(" "),
        style: combinedStyle,
        ...rest,
      });
    }
  );
  WrappedIcon.displayName = `WrappedIcon(${IconComponent.displayName || IconComponent.name || "Icon"})`;
  return WrappedIcon;
}

// Loading Spinner with spin active by default
export const LoadingOutlined = createIconWrapper(Loader2, true);
export const LoadingIcon = LoadingOutlined;

// Semantic *Icon aliases
export const SearchIcon = Search;
export const DownloadIcon = Download;
export const StarIcon = Star;
export const ArrowRightIcon = ArrowRight;
export const ArrowLeftIcon = ArrowLeft;
export const UserIcon = User;
export const SettingIcon = SettingsIcon;
export const SyncIcon = RefreshCwIcon;
export const AppstoreIcon = LayoutGridIcon;
export const CloseIcon = XIcon;
export const DeleteIcon = Trash2Icon;
export const EditIcon = Edit2Icon;
export const CopyIcon = Copy;
export const CalendarIcon = Calendar;
export const PlusIcon = Plus;
export const MinusIcon = Minus;
export const EyeIcon = Eye;
export const EyeInvisibleIcon = EyeOff;
export const MailIcon = Mail;
export const HeartIcon = Heart;
export const UploadIcon = Upload;
export const FilterIcon = Filter;
export const HomeIcon = Home;
export const CheckIcon = Check;

// Ant Design *Outlined conventions
export const SearchOutlined = Search;
export const DownloadOutlined = Download;
export const StarOutlined = Star;
export const ArrowRightOutlined = ArrowRight;
export const ArrowLeftOutlined = ArrowLeft;
export const UserOutlined = User;
export const SettingOutlined = Settings;
export const DownOutlined = ChevronDown;
export const UpOutlined = ChevronUp;
export const LeftOutlined = ChevronLeft;
export const RightOutlined = ChevronRight;
export const CheckOutlined = Check;
export const CloseOutlined = X;
export const DeleteOutlined = Trash2;
export const EditOutlined = Edit2;
export const CopyOutlined = Copy;
export const CalendarOutlined = Calendar;
export const PlusOutlined = Plus;
export const MinusOutlined = Minus;
export const SyncOutlined = RefreshCw;
export const EyeOutlined = Eye;
export const EyeInvisibleOutlined = EyeOff;
export const MailOutlined = Mail;
export const AppstoreOutlined = LayoutGrid;
export const InfoCircleOutlined = Info;
export const ExclamationCircleOutlined = AlertCircle;
export const CheckCircleOutlined = CheckCircle;
export const CloseCircleOutlined = XCircle;
export const HeartOutlined = Heart;
export const ShareAltOutlined = Share2;
export const UploadOutlined = Upload;
export const FilterOutlined = Filter;
export const HomeOutlined = Home;
export const SafetyOutlined = Shield;
export const KeyOutlined = Key;
export const FolderOutlined = Folder;
export const FileOutlined = File;

