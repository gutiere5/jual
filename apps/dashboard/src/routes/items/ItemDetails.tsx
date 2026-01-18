import { itemService } from '../../services/itemServices';
import './ItemDetails.css';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { useFetcher, useLoaderData, useNavigate, type LoaderFunctionArgs } from 'react-router';
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Edit,
  Package,
  Save,
  TrendingDown,
  TrendingUp,
  X,
  XCircle,
} from 'lucide-react';
import { Item, Category, UnitOfMeasure } from '@repo/types/item.schema';

export const itemLoader = async ({ params }: LoaderFunctionArgs) => {
  const { itemId } = params as { itemId: string };
  const item = await itemService.getById(parseInt(itemId, 10));
  return item;
};

export const itemEditAction = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const submission = Object.fromEntries(formData);
  const itemId = parseInt(params.itemId as string, 10);

  if (isNaN(itemId)) return { success: false, error: 'Invalid Item Id' };

  const updateSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    category: z.enum(Category),
    uom: z.enum(UnitOfMeasure).optional(),
    low_stock_threshold: z.coerce.number().optional(),
  });
  const result = updateSchema.safeParse(submission);
  if (!result.success) {
    return { success: false, error: z.prettifyError(result.error) };
  }

  try {
    await itemService.updateItem({ id: itemId, ...result.data });
    return { success: true, message: 'Item Updated Successfully' };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to update item. Please try again.';
    return { success: false, error: errorMessage };
  }
};

function ItemDetails() {
  const item = useLoaderData() as Item;
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';
  const actionData = fetcher.data;
  const lastProcessedData = useRef<unknown>(null);

  useEffect(() => {
    if (
      fetcher.state === 'idle' &&
      actionData?.success &&
      actionData !== lastProcessedData.current
    ) {
      setTimeout(() => setIsEditing(false), 0);
      lastProcessedData.current = actionData;
    }
  }, [fetcher.state, actionData]);

  const isLowStock = item.quantity_remaining < (item.low_stock_threshold ?? 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isExpiringSoon = (expirationDate: string) => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return new Date(expirationDate) <= thirtyDaysFromNow;
  };

  return (
    <div className="item-details-container">
      {/* Alert Message */}
      {actionData?.error && isEditing && (
        <div className="alert alert-error">
          <AlertTriangle className="icon-small" />
          {actionData.error}
        </div>
      )}

      {actionData?.success && !isEditing && (
        <div className="alert alert-success">
          <CheckCircle className="icon-small" />
          {actionData.message}
        </div>
      )}

      <div className="item-details-wrapper">
        {/* Header */}
        <div className="item-details-header-new">
          <div className="header-left">
            <button className="back-button-new" onClick={() => navigate('/')}>
              <ArrowLeft />
            </button>
            <div className="header-title-section">
              <div className="title-with-badge">
                {isEditing ? (
                  <fetcher.Form method="post" id="edit-item-form">
                    <input
                      type="text"
                      name="name"
                      className="edit-title-input"
                      defaultValue={item.name}
                      required
                    />
                  </fetcher.Form>
                ) : (
                  <h1>{item.name}</h1>
                )}
                {isLowStock && (
                  <span className="badge badge-warning">
                    <AlertTriangle className="icon-small" />
                    Low Stock
                  </span>
                )}
              </div>
              <p className="header-subtitle">Item Details & Inventory Management</p>
            </div>
          </div>
          <div className="header-actions">
            {isEditing ? (
              <>
                <button
                  key="save-btn"
                  type="submit"
                  form="edit-item-form"
                  name="intent"
                  value="update_details"
                  className="action-button save-button"
                  disabled={isSubmitting}
                >
                  <Save className="icon-small" />
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>

                <button
                  key="cancel-btn"
                  type="button"
                  className="action-button cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="icon-small" />
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  key="edit-btn"
                  type="button"
                  className="action-button"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="icon-small" />
                  Edit
                </button>

                <button className="action-button">
                  <Download className="icon-small" />
                  Export
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main Item Information Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Item Information</h3>
            <p className="card-description">
              {isEditing
                ? 'Edit basic details and specifications'
                : 'Basic details and specifications'}
            </p>
          </div>
          <div className="card-content">
            <div className="info-grid">
              <div className="info-item">
                <p className="info-label">Item ID</p>
                <p className="info-value">#{item.id}</p>
              </div>
              <div className="info-item">
                <p className="info-label">Category</p>
                {isEditing ? (
                  <select
                    form="edit-item-form"
                    className="edit-select"
                    name="category"
                    defaultValue={item.category}
                  >
                    {Category.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="badge badge-secondary">{item.category}</span>
                )}
              </div>
              <div className="info-item">
                <p className="info-label">Unit of Measure</p>
                {isEditing ? (
                  <select
                    name="uom"
                    className="edit-input"
                    form="edit-item-form"
                    defaultValue={item.uom}
                  >
                    {UnitOfMeasure.map((uom) => (
                      <option key={uom} value={uom}>
                        {uom}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="info-value">{item.uom}</p>
                )}
              </div>
              <div className="info-item">
                <p className="info-label">Low Stock Threshold</p>
                {isEditing ? (
                  <div className="input-with-unit">
                    <input
                      form="edit-item-form"
                      name="low_stock_threshold"
                      type="number"
                      className="edit-input"
                      defaultValue={item.low_stock_threshold}
                    />
                  </div>
                ) : (
                  <p className="info-value">{item.low_stock_threshold}</p>
                )}
              </div>
            </div>

            <div className="stock-summary">
              <div className="summary-grid">
                <div className="info-item">
                  <p className="info-label">Current Stock Level</p>
                  <p className={`stock-level ${isLowStock ? 'stock-low' : ''}`}>
                    {item.quantity_remaining} {item.uom}
                  </p>
                </div>
                <div className="info-item">
                  <p className="info-label">Active Batches</p>
                  <p className="stock-level">{item.stock_batch?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cards-grid">
          {/* Stock Batches Card */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <Package className="icon-medium" />
                Stock Batches
              </h3>
              <p className="card-description">Current inventory batches and expiration dates</p>
            </div>
            <div className="card-content">
              {item.stock_batch && item.stock_batch.length > 0 ? (
                <div className="batches-list">
                  {item.stock_batch.map((batch, index) => {
                    const expiringSoon = isExpiringSoon(batch.expiration_date);
                    return (
                      <div
                        key={index}
                        className={`batch-item ${expiringSoon ? 'batch-expiring' : ''}`}
                      >
                        <div className="batch-header">
                          <div className="batch-title-row">
                            <p className="batch-number">Batch #{index + 1}</p>
                            {expiringSoon && (
                              <span className="badge badge-warning-small">
                                <Clock className="icon-tiny" />
                                Expiring Soon
                              </span>
                            )}
                          </div>
                          <p className="batch-quantity">
                            {batch.quantity_remaining} {item.uom}
                          </p>
                        </div>
                        <div className="batch-date">
                          <Calendar className="icon-small" />
                          <span>Expires: {formatDate(batch.expiration_date)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state">
                  <Package className="empty-icon" />
                  <p>No stock batches available</p>
                </div>
              )}
            </div>
          </div>

          {/* Transactions Card */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <TrendingUp className="icon-medium" />
                Recent Transactions
              </h3>
              <p className="card-description">Inventory movement history</p>
            </div>
            <div className="card-content">
              {item.transaction && item.transaction.length > 0 ? (
                <div className="transactions-list">
                  {item.transaction.map((t, index) => {
                    const isInbound =
                      t.type.toLowerCase().includes('in') ||
                      t.type.toLowerCase().includes('receive');
                    return (
                      <div key={index} className="transaction-item">
                        <div className="transaction-left">
                          <div
                            className={`transaction-icon ${isInbound ? 'icon-inbound' : 'icon-outbound'}`}
                          >
                            {isInbound ? (
                              <TrendingUp className="icon-small" />
                            ) : (
                              <TrendingDown className="icon-small" />
                            )}
                          </div>
                          <div className="transaction-details">
                            <p className="transaction-type">{t.type}</p>
                            <div className="transaction-date">
                              <Calendar className="icon-tiny" />
                              <span>{formatDate(t.transaction_date)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="transaction-right">
                          <p
                            className={`transaction-amount ${isInbound ? 'amount-inbound' : 'amount-outbound'}`}
                          >
                            {isInbound ? '+' : '-'}
                            {Math.abs(t.quantity)} {item.uom}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state">
                  <TrendingUp className="empty-icon" />
                  <p>No transactions recorded</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Waste Tracking Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <XCircle className="icon-medium" />
              Waste Records
            </h3>
            <p className="card-description">Track damaged, expired, or discarded inventory</p>
          </div>
          <div className="card-content">
            {item.waste && item.waste.length > 0 ? (
              <div className="transactions-list">
                {item.waste.map((waste, index) => (
                  <div key={index} className="transaction-item">
                    <div className="transaction-left">
                      <div className="transaction-icon icon-outbound">
                        <XCircle className="icon-small" />
                      </div>
                      <div className="transaction-details">
                        <p className="transaction-type">{waste.reason}</p>
                        <div className="transaction-date">
                          <Calendar className="icon-tiny" />
                          <span>{formatDate(waste.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="transaction-right">
                      <p className="transaction-amount amount-outbound">
                        -{waste.quantity} {item.uom}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <XCircle className="empty-icon" />
                <p>No waste records found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
