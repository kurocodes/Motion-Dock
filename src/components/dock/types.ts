export interface DockContextValue {
    width: number;
    left: number;
    hovered: boolean;
}

export interface DockProps {
    children: React.ReactNode;
    className?: string;
    spacing?: number;
    padding?: number;
}

export interface DockItemProps {
    children: React.ReactNode;
    baseSize?: number;
    maxSize?: number;
    lift?: number;
    fallOf?: number;
    className?: string;
}