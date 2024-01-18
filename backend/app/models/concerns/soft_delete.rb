module SoftDelete    
    extend ActiveSupport::Concern

    module ClassMethods
        def is_soft_deleted(obj)
            !obj.deleted_at.present?
        end

        def soft_delete(obj) 
            obj.update(deleted_at:Time.now) if obj.deleted_at == nil
        end

        def restore(obj)
            obj.update(deleted_at:nil) if obj.deleted_at.present?
        end
    end
end