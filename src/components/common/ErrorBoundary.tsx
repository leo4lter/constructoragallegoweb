import React, { Component, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-charcoal-900 text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-charcoal-800 p-8 border border-charcoal-700 shadow-xl text-center">
            <div className="w-14 h-14 bg-red-500/20 text-red-400 mx-auto flex items-center justify-center rounded-full mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Ocurrió un error inesperado</h2>
            <p className="text-charcoal-300 text-sm mb-6">
              {this.state.error?.message || 'Hubo un inconveniente al cargar los componentes.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium px-5 py-2.5 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
