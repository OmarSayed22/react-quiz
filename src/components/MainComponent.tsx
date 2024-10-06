interface MainComponentProps {
  children: React.ReactNode;
}

function MainComponent({ children }: MainComponentProps) {
  return <main className="main">{children}</main>;
}

export default MainComponent;
