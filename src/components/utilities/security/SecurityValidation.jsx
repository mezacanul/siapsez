import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Card from "../card/Card";
import { Alert } from "antd";
import securityService from "./securityService";

const SecurityValidation = ({ 
    children, 
    employeeId,
    filiacionId,
    requiredPermissions = [], 
    showHistory = false 
}) => {
    const [changeHistory, setChangeHistory] = useState([]);
    const [hasPermission, setHasPermission] = useState(false);
    const [loading, setLoading] = useState(true);
    const userInfo = useSelector((state) => state.user.info);

    useEffect(() => {
        const validatePermissions = async () => {
            try {
                setLoading(true);
                const token = sessionStorage.getItem('jwt');
                const claims = await securityService.verifyPermissions(token);
                
                const userHasPermission = requiredPermissions.every(
                    permission => claims.permissions?.includes(permission)
                );
                setHasPermission(userHasPermission);

                if (showHistory && hasPermission) {
                    const [employeeHistory, filiacionHistory] = await Promise.all([
                        employeeId ? securityService.getEmployeeChanges(employeeId) : null,
                        filiacionId ? securityService.getFiliacionHistory(filiacionId) : null
                    ]);
                    
                    setChangeHistory([
                        ...(employeeHistory?.changes || []),
                        ...(filiacionHistory?.changes || [])
                    ]);
                }
            } catch (error) {
                console.error('Error validando permisos:', error);
                setHasPermission(false);
            } finally {
                setLoading(false);
            }
        };

        validatePermissions();
    }, [userInfo, requiredPermissions, showHistory, employeeId, filiacionId]);

    if (loading) {
        return <div>Validando permisos...</div>;
    }

    if (!hasPermission) {
        return (
            <Alert variant="destructive">
                No tienes permisos suficientes para ver o editar esta información.
            </Alert>
        );
    }

    return (
        <div className="space-y-4">
            {children}
            
            {showHistory && changeHistory.length > 0 && (
                <Card title="Historial de Cambios">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2">Campo</th>
                                    <th className="px-4 py-2">Valor Anterior</th>
                                    <th className="px-4 py-2">Valor Nuevo</th>
                                    <th className="px-4 py-2">Modificado por</th>
                                    <th className="px-4 py-2">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {changeHistory.map((change, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-4 py-2">{change.field}</td>
                                        <td className="px-4 py-2">{change.oldValue}</td>
                                        <td className="px-4 py-2">{change.newValue}</td>
                                        <td className="px-4 py-2">{change.changedBy}</td>
                                        <td className="px-4 py-2">
                                            {new Date(change.timestamp).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default SecurityValidation;